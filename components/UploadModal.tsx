"use client";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true);

      //   extract image and song files
      const imgFile = values.image?.[0];
      const mp3File = values.song?.[0];

      if (!imgFile || !mp3File || !user) {
        toast.error("Fields are missing!");
        return;
      }

      //   generate a unique id
      const uid = uniqid();

      //   upload song
      const { data: mp3Data, error: mp3Error } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uid}`, mp3File, {
          cacheControl: "3600",
          upsert: false,
        });

      if (mp3Error) {
        setIsLoading(false);
        return toast.error("mp3 file upload failed!");
      }

      //   uplaod image attempt
      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uid}`, imgFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imgError) {
        setIsLoading(false);
        return toast.error("Image file upload failed!");
      }

      //   INSERT INTO DB TABLE
      const { error: supabaseErr } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imgData.path,
        song_path: mp3Data.path,
      });

      //   check to see for upload error
      if (supabaseErr) {
        setIsLoading(false);
        return toast.error(supabaseErr.message);
      }

      // upload successful:
      router.refresh();
      setIsLoading(false);
      toast.success("mp3 Added!");
      //   rest form
      reset();
      //   close modal
      uploadModal.onClose();
    } catch (error) {
      toast.error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a new song"
      description="Upload an mp3 file here"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song artist"
        />
        <div>
          <div className="pb-2">Select mp3 file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-2">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
