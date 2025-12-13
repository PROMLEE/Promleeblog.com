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
import { useEffect, useState, useCallback } from "react";
import { EditService } from "@/config/apis";
import { TagsService } from "@/config/apis/service/tags";
import { Badge } from "../ui/badge";
import { moveFiles } from "@/lib/actions/moveFiles";

// MDX frontmatter 파싱 함수
const parseMdxFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatterContent = match[1];
  const result: Record<string, string> = {};

  // 각 줄을 파싱하여 key: value 형태로 추출
  const lines = frontmatterContent.split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      result[key] = value;
    }
  }

  // frontmatter를 제외한 본문 추출
  const body = content.replace(frontmatterRegex, "").trim();

  return { frontmatter: result, body };
};

interface value {
  name: // | "series_id"
    "name" | "nameko" | "url" | "series_no" | "desc" | "thumbnail_url";
  type: "text" | "number" | "checkbox";
  disabled?: boolean;
  formlabel: string;
}

const values: value[] = [
  // { name: "series_id", formlabel: "Series ID", disabled: true, type: "number" },
  { name: "name", formlabel: "Series Name(Eng)", type: "text" },
  { name: "nameko", formlabel: "Series Name(Kor)", type: "text" },
  { name: "url", formlabel: "Series URL", type: "text" },
  { name: "series_no", formlabel: "series_no", type: "number" },
  { name: "desc", formlabel: "Description", type: "text" },
  { name: "thumbnail_url", formlabel: "Thumbnail URL", type: "text" },
];

const FormSchema = z.object({
  // series_id: z.number(),
  name: z
    .string()
    .min(2, { message: "Name(eng) must be at least 2 characters." }),
  nameko: z
    .string()
    .min(2, { message: "Name(ko) must be at least 2 characters." }),
  url: z.string().min(2, { message: "URL must be at least 2 characters." }),
  series_no: z.number(),
  desc: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  thumbnail_url: z.string(),
  lock: z.boolean(),
  posting: z
    .string()
    .min(2, { message: "Posting must be at least 2 characters." }),
  metatag: z.array(z.string()),
  tags: z.array(z.number()),
});

const handleMoveFiles = async () => {
  try {
    const result = await moveFiles();
    console.log(result);
  } catch {
    console.log("error");
  }
};

export const AddPost = ({ series_id }: { series_id: number }) => {
  const [tags, setTags] = useState<TagsResponse.GetTags["data"]>([]);

  useEffect(() => {
    TagsService()
      .getTags({ sort: "id" })
      .then((res) => setTags(res));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // series_id,
      name: "",
      nameko: "",
      url: "",
      series_no: 0,
      desc: "",
      thumbnail_url: "",
      lock: false,
      posting: "",
      metatag: [],
      tags: [],
    },
  });

  // MDX 붙여넣기 시 자동 파싱 및 폼 필드 채우기
  const handlePostingChange = useCallback(
    (value: string) => {
      form.setValue("posting", value);

      const parsed = parseMdxFrontmatter(value);
      if (parsed) {
        const { frontmatter } = parsed;

        // frontmatter 값으로 폼 필드 자동 채우기
        if (frontmatter.title_en) {
          form.setValue("name", frontmatter.title_en);
        }
        if (frontmatter.title_ko) {
          form.setValue("nameko", frontmatter.title_ko);
        }
        if (frontmatter.url) {
          form.setValue("url", frontmatter.url);
        }
        if (frontmatter.series_no) {
          form.setValue("series_no", parseInt(frontmatter.series_no) || 0);
        }
        if (frontmatter.desc) {
          form.setValue("desc", frontmatter.desc);
        }
        if (frontmatter.thumbnail_url) {
          form.setValue("thumbnail_url", frontmatter.thumbnail_url);
        }
        if (frontmatter.metatag) {
          // 쉼표로 구분된 태그를 배열로 변환
          const metatags = frontmatter.metatag
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);
          form.setValue("metatag", metatags);
        }
        if (frontmatter.tags) {
          // 태그 이름으로 태그 ID 찾기
          const tagNames = frontmatter.tags
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter((t) => t);
          const tagIds = tags
            .filter((tag) => tagNames.includes(tag.name.toLowerCase()))
            .map((tag) => parseInt(tag.id));
          if (tagIds.length > 0) {
            form.setValue("tags", tagIds);
          }
        }

        // posting은 전체 내용 유지 (frontmatter 포함)
        // 이미 위에서 setValue로 전체 value가 설정되어 있음
      }
    },
    [form, tags],
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `Name: ${data.name}\nName(ko): ${data.nameko}\nURL: ${data.url}\nSeries_no: ${data.series_no}\nDescription: ${data.desc}\nThumbnail URL: ${data.thumbnail_url}\nLock: ${data.lock}\nPosting: ${data.posting.slice(0, 20)}...`;
    if (window.confirm("Do you want to add this Post?\n" + confirmtext)) {
      await EditService().postPost({ ...data, series_id });
      handleMoveFiles();
      // window.location.reload();
    }
    // }
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
            <Button type="submit">Submit</Button>
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
                        type={value.type}
                        {...field}
                        onChange={
                          value.type === "number"
                            ? (e) => field.onChange(Number(e.target.value))
                            : field.onChange
                        }
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
              name="metatag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metatag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Metatag"
                      type="text"
                      className="border-third"
                      value={field.value.join(", ")}
                      onChange={(e) =>
                        field.onChange(e.target.value.split(", "))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Posting (MDX 전체 붙여넣기 시 자동 파싱)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="MDX 파일 내용을 붙여넣으면 frontmatter가 자동으로 파싱됩니다"
                      className="border-third min-h-[200px] resize-none"
                      value={field.value}
                      onChange={(e) => handlePostingChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lock"
              render={({ field }) => (
                <FormItem className="border-third flex flex-row items-center justify-between rounded-lg border p-4">
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
              className={`cursor-pointer p-3 text-base hover:bg-transparent ${
                form.watch("tags").includes(parseInt(tag.id))
                  ? "bg-secondary"
                  : "bg-primary"
              }`}
              onClick={() => {
                const selected = form.getValues("tags");
                const id = parseInt(tag.id);
                form.setValue(
                  "tags",
                  selected.includes(id)
                    ? selected.filter((t) => t !== id)
                    : [...selected, id],
                );
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
