"use client";

// import { useState } from "react";
// import { useFormState } from "react-dom";
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
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import $axios from "@/lib/axios.instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import { addContact } from "./actions/contact";
import { z } from "zod";
const formSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  userEmail: z.string().email({ message: "Invalid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});
export default function ContactUs() {
  const router = useRouter();
  //   const [state, formAction] = useFormState(addContact, null);
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = async (values) => {
    // setIsSubmitting(true);
    // await formAction(formData);
    // setIsSubmitting(false);
    console.log(values);

    const response = await $axios.post("/contact/contactUs", values);
    console.log(response);
    if (!response) {
      throw new Error(`HTTP erroe!:Status: ${response.status}`);
    }
    if (response.status === 201) {
      alert("Message received! Thank you for contacting us.");
      console.log(response);
      console.log("Submitted values", values);
      router.push("/pages/homepage");
    }

    // console.log(values);
  };

  return (
    <section className="py-16 bg-[#e6d4b9] pt-[80px]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-14 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            <span className="text-[#8f3623]">Get </span>
            <span className="text-blue-800">In </span>
            <span className="text-[#8f3623]">Touch</span>
          </h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to assist you. Fill out the form or reach out through
            other channels.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="grid gap-8 sm:grid-cols-2">
            <ContactInfo
              icon={<Mail className="h-6 w-6 text-[#8f3623]" />}
              title="Email Us"
              description="Our team is ready to assist."
              link="bookowl@gmail.com"
              linkText="bookowl@gmail.com"
            />
            {/* <ContactInfo
              icon={<MessagesSquare className="h-6 w-6 text-blue-800" />}
              title="Live Chat Support"
              description="Reach out for quick help."
              link="#"
              linkText="Start a new chat"
            /> */}
            <ContactInfo
              icon={<MapPin className="h-6 w-6 text-[#8f3623]" />}
              title="Visit Us"
              description="Drop by our college for a chat."
              link="#"
              linkText="Balkumari, Lalitpur, Nepal"
            />
            <ContactInfo
              icon={<Phone className="h-6 w-6 text-[#8f3623]" />}
              title="Call Us"
              description="We're available Sun-Fri, 7am-2pm."
              link="9843987316"
              linkText="9843987316"
            />
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-[#af886b]">
                  Submit
                  {/* {isSubmitting ? "Sending..." : "Send Message"} */}
                </Button>
              </form>
            </Form>
            {/* {state?.success && (
              <p className="mt-4 text-green-600 text-center">
                Thank you for your message. We&apos;ll be in touch soon!
              </p>
            )} */}
          </div>
        </div>
        <div className="mt-16">
          <h2 className="mb-4 text-2xl font-bold text-[#8f3623]">
            Our Location
          </h2>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4854750354393!2d85.33616337611286!3d27.671386427075326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e8af4a5fe3%3A0x963d00cdf478c6b6!2sNepal%20College%20of%20Information%20Technology!5e0!3m2!1sen!2snp!4v1737641245170!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

const ContactInfo = ({ icon, title, description, link, linkText }) => (
  <div className="flex flex-col items-start">
    {icon}
    <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
    <a href={link} className="mt-2 text-blue-600 hover:underline">
      {linkText}
    </a>
  </div>
);

// const FormField = ({ label, name, type, placeholder, error }) => (
//   <div>
//     <Label htmlFor={name}>
//       {label}
//       <sup className="ml-0.5 text-red-500">*</sup>
//     </Label>
//     <Input
//       type={type}
//       id={name}
//       name={name}
//       placeholder={placeholder}
//       className="mt-1"
//     />
//     {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//   </div>
// );
