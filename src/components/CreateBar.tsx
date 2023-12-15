"use client";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  task: z
    .string()
    .min(2, {
      message: "Task is required!",
    })
    .max(100),
});

interface CreateBarProps {
  initialData?: {
    id: string;
    task: String;
  };
}

type CreateBarValue = z.infer<typeof formSchema>;

const CreateBar: React.FC<CreateBarProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //spinner
  const Icons = {
    spinner: Loader2,
  };

  const form = useForm<CreateBarValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  async function onSubmitHandler(data: CreateBarValue) {
    setLoading(true);

    try {
      const res = await axios.post("/api/todo", data);
      router.refresh();
    } catch (error) {
      console.log("TODO-ERROR", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-full flex gap-3 items-center"
        >
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Task</FormLabel> */}
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Enter task"
                    {...field}
                    autoFocus
                    className={"w-[325px]"}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">
            {loading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateBar;
