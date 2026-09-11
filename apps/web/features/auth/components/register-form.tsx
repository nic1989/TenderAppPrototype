"use client";

import { RegisterFormData, registerSchema } from "../schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "../hooks/useRegister";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
    const reigsterMutation = useRegister();
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof registerSchema>) {
        reigsterMutation.mutate(data);
    }

    return (
        <Card className="w-full mb-1 sm:max-w-md">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                {...form.register("name")}
                                className="h-11"
                                placeholder="Enter your Name"
                            />

                            <FieldError
                                errors={[
                                form.formState.errors.name,
                                ].filter(Boolean)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                {...form.register("email")}
                                className="h-11"
                                placeholder="Enter your email"
                            />

                            <FieldError
                                errors={[
                                form.formState.errors.email,
                                ].filter(Boolean)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input
                                {...form.register("password")}
                                type="password"
                                className="h-11"
                                placeholder="Enter your password"
                            />

                            <FieldError
                                errors={[
                                form.formState.errors.password,
                                ].filter(Boolean)}
                            />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        form="form-rhf-demo"
                        disabled={reigsterMutation.isPending}
                        className="w-full h-11 font-medium cursor-pointer">
                        {reigsterMutation.isPending ? "Register..." : "Register"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}