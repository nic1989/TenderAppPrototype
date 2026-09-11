'use client'

import { ProfileFormData, profileSchema } from "../schema/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CompanyProfile } from "../types/profile.type";
import { useEffect, useState } from "react";
import { useCreateProfile } from "../hooks/useCreateProfile";
import { Info, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProfileDataProps {
    profileData?: CompanyProfile
}

interface InputTagsState {
    certifications: string[];
    documents: string[];
}

export default function ProfileForm({profileData}: ProfileDataProps) {
    const createProfile = useCreateProfile();
    const [turnoverUnit, setTurnoverUnit] = useState('crores');
    const [inputTags, setInputTags] = useState<InputTagsState>({certifications: [], documents: []})
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            companyName: "",
            turnover: 0,
            experience: 0,
            certifications: '',
            documents: '',
            employeeCount: 0,
            gstNumber: "",
            panNumber: "",
            industry: "",
            website: "",
        }
    });

    function onSubmit(data: z.infer<typeof profileSchema>) {
        let website = data?.website;
        if (!data?.website?.startsWith("http://") && !data?.website?.startsWith("https://")) {
            website = "https://" + data?.website;
        }
        const formData = {
            ...data,
            turnover: `${data.turnover} ${turnoverUnit}`,
            experience: `${data.experience} Years`,
            certifications: inputTags?.certifications || [],
            documents: inputTags?.documents || [],
            website
        }
        console.log('form data', formData);
        // createProfile.mutate(formData);
    }

    useEffect(() => {
        if (!profileData) {
            return;
        }
        form.reset({
            companyName: profileData.companyName || "",
            turnover: profileData.turnover || 0,
            experience: profileData.experience || 0,
            // certifications: profileData.certifications || [],
            // documents: profileData.documents || [],
            employeeCount: profileData.employeeCount || 0,
            gstNumber: profileData.gstNumber || "",
            panNumber: profileData.panNumber || "",
            industry: profileData.industry || "",
            website: profileData.website || "",
        });
    }, [profileData, form]);
    
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, type: string) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (type === 'cert') {
                const value = form.getValues('certifications');
                const certificationArr: string[] = [...inputTags.certifications, value].flat() as string[];
                setInputTags({
                    ...inputTags,
                    certifications: certificationArr
                });
                form.setValue('certifications', '');
            }
            if (type === 'doc') {
                const value = form.getValues('documents');
                const documentArr: string[] = [...inputTags.documents, value].flat() as string[];
                setInputTags({
                    ...inputTags,
                    documents: documentArr
                });
                form.setValue('documents', '');
            }
        }
    }

    const removeTag = (tagToRemove: string, type: string) => {
        if (type === 'cert') {
            const updatedTags = inputTags.certifications.filter((tag) => tag !== tagToRemove);
            setInputTags({
                ...inputTags,
                certifications: updatedTags
            });
        }
        if (type === 'doc') {
            const updatedTags = inputTags.documents.filter((tag) => tag !== tagToRemove);
            setInputTags({
                ...inputTags,
                documents: updatedTags
            });
        }
    };

    return (
        <Card className="max-w-3xl mx-auto rounded-xl shadow-md">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-end mb-4 text-xs"><span className="text-sm text-destructive">*</span>&nbsp;This is required field.</div>
                    <div className="grid grid-cols-2 gap-4 p-6">
                        <FieldGroup>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Company Name<span className="text-sm text-destructive">*</span></FieldLabel>
                                <Input
                                    {...form.register("companyName")}
                                    className="h-11"
                                    placeholder="Enter company Name"
                                />

                                <FieldError
                                    errors={[
                                    form.formState.errors.companyName,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Company TurnOver<span className="text-sm text-destructive">*</span></FieldLabel>
                                <div className="flex">
                                    <Input
                                        {...form.register("turnover", { valueAsNumber: true })}
                                        type="number"
                                        className="h-11 mr-2"
                                        placeholder="Enter your turnover"
                                    />
                                    <ToggleGroup
                                        size="sm"
                                        spacing={0}
                                        type="single"
                                        variant="outline"
                                        defaultValue="crores"
                                        onValueChange={(val) => setTurnoverUnit(val)}>
                                        <ToggleGroupItem value="lakhs" aria-label="Toggle lakhs">
                                            Lakhs
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="crores" aria-label="Toggle crores">
                                            Crores
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </div>
                                <FieldError
                                    errors={[
                                    form.formState.errors.turnover,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Experience Year<span className="text-sm text-destructive">*</span></FieldLabel>
                                <Input
                                    {...form.register("experience", { valueAsNumber: true })}
                                    type="number"
                                    className="h-11"
                                    placeholder="Enter company experience"
                                />
                                <FieldError
                                    errors={[
                                    form.formState.errors.experience,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Certifications 
                                    <Tooltip>
                                        <TooltipTrigger><Info size={12} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Hit enter after add any single certificate</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </FieldLabel>
                                <Input
                                    {...form.register("certifications")}
                                    type="text"
                                    className="h-11"
                                    onKeyDown={(e) => handleKeyDown(e, 'cert')}
                                    placeholder="Enter company certificates"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {inputTags.certifications?.map((tag, index) => (
                                        <Badge
                                            key={index} 
                                            variant="secondary" 
                                            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag, 'cert')}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <FieldError
                                    errors={[
                                    form.formState.errors.certifications,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Documents 
                                    <Tooltip>
                                        <TooltipTrigger><Info size={12} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Hit enter after add any single Document</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </FieldLabel>
                                <Input
                                    {...form.register("documents")}
                                    type="text"
                                    className="h-11"
                                    onKeyDown={(e) => handleKeyDown(e, 'cert')}
                                    placeholder="Enter company documents"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {inputTags.documents?.map((tag, index) => (
                                        <Badge
                                            key={index} 
                                            variant="secondary" 
                                            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag, 'doc')}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <FieldError
                                    errors={[
                                    form.formState.errors.documents,
                                    ].filter(Boolean)}
                                />
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Employee Count<span className="text-sm text-destructive">*</span></FieldLabel>
                                <Input
                                    {...form.register("employeeCount", { valueAsNumber: true })}
                                    type="number"
                                    className="h-11"
                                    placeholder="Enter company employeeCount"
                                />
                                <FieldError
                                    errors={[
                                    form.formState.errors.employeeCount,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>GST Number<span className="text-sm text-destructive">*</span></FieldLabel>
                                <Input
                                    {...form.register("gstNumber")}
                                    type="text"
                                    className="h-11"
                                    placeholder="Enter company GST Number"
                                />
                                <FieldError
                                    errors={[
                                    form.formState.errors.gstNumber,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>PAN Number<span className="text-sm text-destructive">*</span></FieldLabel>
                                <Input
                                    {...form.register("panNumber")}
                                    type="text"
                                    className="h-11"
                                    placeholder="Enter company PAN Number"
                                />
                                <FieldError
                                    errors={[
                                    form.formState.errors.panNumber,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Industry Type</FieldLabel>
                                <Input
                                    {...form.register("industry")}
                                    type="text"
                                    className="h-11"
                                    placeholder="Enter industry type"
                                />
                                <FieldError
                                    errors={[
                                    form.formState.errors.industry,
                                    ].filter(Boolean)}
                                />
                            </Field>
                            <Field className="h-24" orientation="responsive">
                                <FieldLabel>Website</FieldLabel>
                                <InputGroup className="h-11">
                                    <InputGroupInput {...form.register("website")} placeholder="example.com" />
                                    <InputGroupAddon>
                                        <InputGroupText>https://</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <FieldError
                                    errors={[
                                    form.formState.errors.website,
                                    ].filter(Boolean)}
                                />
                            </Field>
                        </FieldGroup>
                    </div>
                    
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        form="form-rhf-demo"
                        // disabled={loginMutation.isPending}
                        className="w-full h-11 font-medium cursor-pointer">
                            Submit
                        {/* {loginMutation.isPending ? "Signing In..." : "Sign In"} */}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}