"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditService } from "@/config/apis";

interface value {
  name: "name" | "nameko" | "url" | "subject_no" | "caption";
  type?: boolean;
  disabled?: boolean;
  formlabel: string;
}

const values: value[] = [
  // { name: "subject_id", formlabel: "Subject ID", disabled: true, type: true },
  { name: "name", formlabel: "Subject Name(Eng)" },
  { name: "nameko", formlabel: "Subject Name(Kor)" },
  { name: "url", formlabel: "Subject URL" },
  { name: "subject_no", formlabel: "Subject_no", type: true },
  { name: "caption", formlabel: "Caption" },
];
const FormSchema = z.object({
  // subject_id: z.number(),
  name: z
    .string()
    .min(2, { message: "Name(eng) must be at least 2 characters." }),
  nameko: z
    .string()
    .min(2, { message: "Name(ko) must be at least 2 characters." }),
  url: z.string().min(2, { message: "URL must be at least 2 characters." }),
  subject_no: z.number(),
  caption: z.string(),
});

export const AddSeries = ({ subject_id }: { subject_id: number }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // subject_id,
      name: "",
      nameko: "",
      url: "",
      subject_no: 0,
      caption: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const confirmtext = `Subject ID: ${data.name}\nSeries Name(Kor): ${data.nameko}\nSeries URL: ${data.url}\nSubject_no: ${data.subject_no}\nDescription: ${data.caption}`;
    if (window.confirm("Do you want to add this Series?\n" + confirmtext)) {
      // joinApi({ body: data });
      EditService().postSeries({ ...data, subject_id });
      window.location.reload();
    }
  }

  return (
    <Form {...form}>
      <h1 className="my-4 text-2xl font-bold">시리즈(Series) 추가</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                    onChange={
                      value.type
                        ? (e) => field.onChange(Number(e.target.value))
                        : field.onChange
                    }
                    type={value.type ? "number" : "text"}
                    className="border-third"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
