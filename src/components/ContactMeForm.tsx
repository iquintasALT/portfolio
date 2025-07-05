import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactMeForm: React.FC = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async () => {
    // TODO: Implement form submission logic
    reset();
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl p-8 shadow-lg bg-background/90 dark:bg-secondary/90">
      <h2 className="mb-6 text-center text-2xl font-bold text-primary">
        Send a Message
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground text-center">
            Your Name
          </label>
          <input
            {...register("name")}
            className="w-full rounded-md border border-foreground/30 bg-background px-4 py-2 text-base text-foreground
            placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2
            focus:ring-primary/20 dark:bg-background"
            placeholder="Your Name"
            autoComplete="name"
          />
          {errors.name && (
            <div className="mt-1 text-sm text-red-500 text-center">
              {errors.name.message}
            </div>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground text-center">
            Your Email
          </label>
          <input
            {...register("email")}
            className="w-full rounded-md border border-foreground/30 bg-background px-4 py-2 text-base text-foreground
            placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 
            focus:ring-primary/20 dark:bg-background"
            placeholder="you@email.com"
            autoComplete="email"
            type="email"
          />
          {errors.email && (
            <div className="mt-1 text-sm text-red-500 text-center">
              {errors.email.message}
            </div>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground text-center">
            Your Message
          </label>
          <textarea
            {...register("message")}
            className="min-h-[60px] w-full resize-vertical rounded-md border border-foreground/30 bg-background px-4 py-2
            text-base text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary
            focus:ring-2 focus:ring-primary/20 dark:bg-background"
            placeholder="Your Message"
            rows={5}
          />
          {errors.message && (
            <div className="mt-1 text-sm text-red-500 text-center">
              {errors.message.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2 px-6 font-semibold text-background transition-colors disabled:cursor-not-allowed disabled:opacity-60 hover:bg-primary/90"
        >
          Send Message
          <Send className="ml-2 h-5 w-5" />
        </button>
        {errors.root && (
          <div className="text-center text-sm text-red-500">
            {errors.root.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactMeForm;
