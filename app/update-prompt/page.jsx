"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptdetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);

        const data = await response.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }

    if(promptId) getPromptdetails();
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt ID not found");
    try {
      const res = await fetch(`/api/prompt/${promptId}`,{
        method: "PATCH",
        body:JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if(res.ok){
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlesubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
