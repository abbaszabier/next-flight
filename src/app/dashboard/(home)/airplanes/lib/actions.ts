"use server";

import type { ActionResults } from "@/app/dashboard/(auth)/login/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDataAirplanesAction(
  state: ActionResults,
  formData: FormData
): Promise<ActionResults> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Invalid form data",
      errorDecs: errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image as File);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to upload file",
      errorDecs: [uploadedFile.message],
    };
  }

  try {
    await prisma.airplane.create({
      data: {
        code: values.data.code as string,
        name: values.data.name as string,
        image: uploadedFile as string,
      },
    });
  } catch (error) {
    console.error(error);

    return {
      errorTitle: "Failed to create airplane",
      errorDecs: ["An error occurred while creating airplane"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function getDetailDataAirplanesAction(id: string) {
  try {
    const data = await prisma.airplane.findUnique({
      where: {
        id: id,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateDataAirplanesAction(
  state: ActionResults,
  id: string,
  formData: FormData
): Promise<ActionResults> {
  const image = formData.get("image") as File;

  let airplanesFormSchemaUpdate;

  if (image.size === 0) {
    airplanesFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
  } else {
    airplanesFormSchemaUpdate = airplaneFormSchema;
  }

  const values = airplanesFormSchemaUpdate.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Invalid form data",
      errorDecs: errorDesc,
    };
  }

  let filename;

  if (image.size > 0) {
    const uploadedFile = await uploadFile(image);
    if (uploadedFile instanceof Error) {
      return {
        errorTitle: "Failed to upload file",
        errorDecs: [uploadedFile.message],
      };
    }

    filename = uploadedFile as string;
  } else {
    const airplane = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
      select: {
        image: true,
      },
    });

    filename = airplane?.image;
  }

  try {
    await prisma.airplane.update({
      where: {
        id: id,
      },
      data: {
        code: values.data.code as string,
        name: values.data.name as string,
        image: filename,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to update airplane",
      errorDecs: [String(error)],
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function deleteDataAirplanesAction(
  id: string
): Promise<ActionResults | undefined> {
  const data = await prisma.airplane.findFirst({
    where: {
      id: id,
    },
  });

  if (!data) {
    return {
      errorTitle: "Data not found",
      errorDecs: [],
    };
  }

  const deletedFile = await deleteFile(data.image);

  if (deletedFile instanceof Error) {
    return {
      errorTitle: "Failed to delete airplane",
      errorDecs: ["An error occurred while deleting airplane"],
    };
  }

  try {
    await prisma.airplane.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Failed to delete airplane",
      errorDecs: [String(error)],
    };
  }

  revalidatePath("/dashboard/airplanes");
}
