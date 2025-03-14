"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { EditService, PostService } from "@/config/apis";
import { TagsService } from "@/config/apis/service/tags";
import { Badge } from "../ui/badge";

interface value {
  name:
    | "series_id"
    | "name"
    | "nameko"
    | "url"
    | "series_no"
    | "desc"
    | "thumbnail_url";
  type: "text" | "number" | "checkbox";
  disabled?: boolean;
  formlabel: string;
}

const values: value[] = [
  {
    name: "series_id",
    formlabel: "Series ID",
    disabled: true,
    type: "number",
  },
  {
    name: "name",
    formlabel: "Series Name(Eng)",
    type: "text",
  },
  {
    name: "nameko",
    formlabel: "Series Name(Kor)",
    type: "text",
  },
  {
    name: "url",
    formlabel: "Series URL",
    type: "text",
  },
  {
    name: "series_no",
    formlabel: "series_no",
    type: "number",
  },
  {
    name: "desc",
    formlabel: "Description",
    type: "text",
  },
  {
    name: "thumbnail_url",
    formlabel: "Thumbnail URL",
    type: "text",
  },
];
interface series {
  series_id: number;
  name: string;
  nameko: string;
  url: string;
  series_no: number;
  desc: string;
  thumbnail_url: string;
  lock: boolean;
  posting: string;
  metatag: string[];
}
const FormSchema = z.object({
  series_id: z.string().transform((v) => Number(v) || 0),
  name: z.string().min(2, {
    message: "Name(eng) must be at least 2 characters.",
  }),
  nameko: z.string().min(2, {
    message: "Name(ko) must be at least 2 characters.",
  }),
  url: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
  series_no: z.string().transform((v) => Number(v) || 0),
  desc: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  thumbnail_url: z.string(),
  lock: z.boolean().default(false),
  posting: z.string().min(2, {
    message: "Posting must be at least 2 characters.",
  }),
  metatag: z.array(z.string()),
});

export const EditPost = ({
  series_id,
  post_id,
  post_url,
}: {
  series_id: number;
  post_id?: number;
  post_url?: string;
}) => {
  const [tags, setTags] = useState<TagsResponse.GetPostTags["data"]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      series_id,
      name: "",
      nameko: "",
      url: "",
      series_no: 0,
      desc: "",
      thumbnail_url: "",
      lock: false,
      posting: "",
      metatag: [],
    },
  });

  useEffect(() => {
    if (post_id) {
      PostService()
        .getPost({ post_id: `${post_id.toString()}-${post_url}` })
        .then((res) => {
          form.reset(res);
        });
      TagsService()
        .postTags(post_id.toString())
        .then((res) => {
          setTags(res);
        });
    }
  }, [post_id]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `Name: ${data.name}\nName(ko): ${data.nameko}\nURL: ${data.url}\nSeries_no: ${data.series_no}\nDescription: ${data.desc}\nThumbnail URL: ${data.thumbnail_url}\nLock: ${data.lock}\nPosting: ${data.posting.slice(0, 20) + "..."}`;
    if (window.confirm("Do you want to add this Post?\n" + confirmtext)) {
      if (post_id && post_url) {
        await EditService().patchPost(data, post_id);
        window.location.reload();
      } else {
        await EditService().postPost({ ...data, tags: [] });
        window.location.reload();
      }
    }
  }

  return (
    <div className="flex w-full gap-10">
      <div className="w-3/4">
        <Form {...form}>
          <h1 className="my-4 text-2xl font-bold">포스트(Post) 추가</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {values.map((value) => (
              <FormField
                control={form.control}
                key={value.name}
                name={value.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{value.formlabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={value.formlabel}
                        disabled={value.disabled}
                        {...field}
                        type={value.type}
                        className="border-third"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              key="lock"
              name="lock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-third p-4">
                  <FormLabel>Lock</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-third data-[state=unchecked]:bg-secondary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="metatag"
              name="metatag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metatag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Metatag"
                      onChange={(e) => {
                        field.onChange(e.target.value.split(","));
                      }}
                      value={field.value.join(",")}
                      type="text"
                      className="border-third"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="posting"
              name="posting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posting</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Posting"
                      className="resize-none border-third"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="h-full w-1/4">
        <div className="h-full w-1/4 text-2xl">Tags</div>
        <div className="mt-5 flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              className={`cursor-pointer p-3 text-base hover:bg-transparent ${tag.isExist ? "bg-secondary" : "bg-primary"}`}
              onClick={async () => {
                if (post_id === undefined) return;
                if (tag.isExist) {
                  await TagsService()
                    .deleteTags({
                      post_id: post_id,
                      tag_id: parseInt(tag.id),
                    })
                    .then(() => {
                      setTags(
                        tags.map((t) =>
                          t.id === tag.id ? { ...t, isExist: false } : t,
                        ),
                      );
                    });
                } else {
                  await TagsService()
                    .addTags({
                      post_id: post_id,
                      tag_id: parseInt(tag.id),
                    })
                    .then(() => {
                      setTags(
                        tags.map((t) =>
                          t.id === tag.id ? { ...t, isExist: true } : t,
                        ),
                      );
                    });
                }
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <div
          className="mt-10 h-full w-1/4 cursor-pointer text-2xl hover:text-white active:text-pink-400"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://www.promleeblog.com/blog/post/${post_id}-${post_url}`,
            );
          }}
        >
          Copy
        </div>
        <a
          className="h-full cursor-pointer break-words hover:text-white active:text-pink-400"
          href={`https://www.promleeblog.com/blog/post/${post_id}-${post_url}`}
          target="_blank"
        >{`https://www.promleeblog.com/blog/post/${post_id}-${post_url}`}</a>
      </div>
    </div>
  );
};
