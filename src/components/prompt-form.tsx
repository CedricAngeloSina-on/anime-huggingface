"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  input_prompt: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  negative_prompt: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  guidance_scale: z.number(),
  inference_steps: z.number(),
  seed: z.number(),
});

export function PromptForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input_prompt: "",
      negative_prompt: "",
      guidance_scale: 0,
      inference_steps: 0,
      seed: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.message("You have submitted the following values", {
      description: JSON.stringify(values, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Input Prompt */}
        <FormField
          control={form.control}
          name="input_prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Input Prompt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Negative Prompt */}
        <FormField
          control={form.control}
          name="negative_prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Negative Prompt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Guidance Scale */}
        <FormField
          control={form.control}
          name="guidance_scale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guidance Scale</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)} // "+" ensures that the value retrieved from the input field
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Inference Steps */}
        <FormField
          control={form.control}
          name="inference_steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inference Steps</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)} // "+" ensures that the value retrieved from the input field
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Seed */}
        <FormField
          control={form.control}
          name="seed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seeds</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)} // "+" ensures that the value retrieved from the input field
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
