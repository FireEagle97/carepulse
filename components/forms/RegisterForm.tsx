"use client" //use client side

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField, {FormFieldType} from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { SelectItem } from "@/components/ui/select"
import Image from "next/image"



const RegisterForm = ({user} : {user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async ({name ,email, phone}: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try{
      const userData = {name,email,phone};
      const newUser = await createUser(userData);
      if(newUser) router.push(`/patients/${newUser.$id}/register`)
    }catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourserlf.</p>
        </section>
        <section className="space-y-4">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="555-123-1234"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
                <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                {GenderOptions.map((option) => (
                    <div key={option}
                    className="radio-group">
                        <RadioGroupItem
                            value={option} id={option}
                        />
                        <label htmlFor={option}
                            className="cursor-pointer">
                            {option}
                        </label>
                    </div>
                ))}
                </RadioGroup>
            </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="adress"
            label="Address"
            placeholder="14th Street, New York"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergenct contact number"
            placeholder="555-123-1234"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>
        <section className="space-y-4">
                <div className="mb-9 space-y-1">
                    <h2 className="sub-header">Medical Information</h2>
                </div>
        </section>
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Insurance provider"
                placeholder="BlueCross"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Insurance policy number"
                placeholder="ABC1234"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Allergies (if any)"
                placeholder="Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Current medication (if any)"
                placeholder="Ibuprofen 200mg, Advil 500mg"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Family medical history"
                placeholder="Mother had a brain cancer, Father had heart disease"
            />
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history"
                placeholder="Appendectomy, Tonsillectomy"
            />
        </div>    
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}
export default RegisterForm