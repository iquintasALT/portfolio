import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import React from "react";
import * as Toast from '@radix-ui/react-toast';
import { useForm } from "react-hook-form";
import * as z from "zod";
import texts from "@content/texts.json";

const contactFormSchema = z.object({
  name: z.string().min(2, texts.contactForm.fields.name.error),
  email: z.string().email(texts.contactForm.fields.email.error),
  message: z.string().min(10, texts.contactForm.fields.message.error),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactMeForm: React.FC = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error'>('success');

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message.');
      }
      reset();
      setToastType('success');
      setToastMsg(texts.contactForm.success);
      setToastOpen(true);
    } catch (err: any) {
      setError('root', { message: err.message || texts.contactForm.error });
      setToastType('error');
      setToastMsg(err.message || texts.contactForm.error);
      setToastOpen(true);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-md rounded-2xl p-8 shadow-lg bg-background/90 dark:bg-secondary/90">
        <h2 className="mb-6 text-center text-2xl font-bold text-primary">
          {texts.contactForm.title}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground text-center">
              {texts.contactForm.fields.name.label}
            </label>
            <input
              {...register("name")}
              className="w-full rounded-lg border border-foreground/20 bg-background px-4 py-2 text-base text-foreground shadow-sm
              placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-background"
              placeholder={texts.contactForm.fields.name.placeholder}
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
              {texts.contactForm.fields.email.label}
            </label>
            <input
              {...register("email")}
              className="w-full rounded-lg border border-foreground/20 bg-background px-4 py-2 text-base text-foreground shadow-sm
              placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-background"
              placeholder={texts.contactForm.fields.email.placeholder}
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
              {texts.contactForm.fields.message.label}
            </label>
            <textarea
              {...register("message")}
              className="min-h-[60px] w-full resize-vertical rounded-lg border border-foreground/20 bg-background px-4 py-2 text-base text-foreground shadow-sm
              placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-background"
              placeholder={texts.contactForm.fields.message.placeholder}
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
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2 px-6 font-semibold text-white shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.03]"
          >
            {texts.contactForm.submit}
            <Send className="ml-2 h-5 w-5" />
          </button>
          {errors.root && (
            <div className="text-center text-sm text-red-500">
              {errors.root.message}
            </div>
          )}
        </form>
      </div>
      <Toast.Root open={toastOpen} onOpenChange={setToastOpen} className={
        `pointer-events-auto z-[9999] rounded-xl px-6 py-4 shadow-2xl border-2 ${toastType === 'success' ? 'border-green-400 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white' : 'border-red-400 bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white'} flex items-center gap-3 animate-fade-in-up`
      }>
        <Toast.Title className="font-semibold text-lg tracking-wide">
          {toastType === 'success' ? texts.contactForm.successTitle : texts.contactForm.errorTitle}
        </Toast.Title>
        <Toast.Description className="text-base">
          {toastMsg}
        </Toast.Description>
        <Toast.Close className="ml-auto text-white/80 hover:text-white text-xl font-bold px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white/60">
          ×
        </Toast.Close>
      </Toast.Root>
    </>
  );
};

export default ContactMeForm;
