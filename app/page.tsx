"use client";

import React, { useState } from "react";
import request, { ClientError } from "graphql-request";
import { Form, Input, Button, RadioGroup, Radio } from "@heroui/react";
import { title } from "@/components/primitives";
import { useMutation } from "@tanstack/react-query";
import { User, UserMutationDocument } from "../graphql/user";
import { useRouter } from "next/navigation";
import { Error, SERVICE_TYPE } from "./types/types";
import { API_URL } from "@/constants";
import { Alert } from "@heroui/react";

export default function App() {
  const router = useRouter();
  // set default values
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    mobile: "",
    postcode: "",
    service_type: SERVICE_TYPE.DELIVERY,
  });
  const [error, setError] = useState<Error>({
    isError: false,
    message: "",
    title: "",
  });

  const { mutate: register } = useMutation({
    mutationFn: async (user: User) =>
      request(API_URL, UserMutationDocument, {
        ...user,
      }),
  });

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [evt.target.name]: evt.target.value,
    });
  };

  const onSubmit = (formEvt: React.FormEvent<HTMLFormElement>) => {
    formEvt.preventDefault();
    register(user, {
      onSettled(data, error) {
        const err = error as unknown as ClientError;

        if (data) {
          router.push("/lead");
        }

        if (
          err &&
          err.response &&
          err.response.errors &&
          err.response.errors.length
        ) {
          for (const clientErr of err.response.errors) {
            setError({
              isError: true,
              message: clientErr.message,
              title: "Registration error",
            });
          }
        }
      },
    });
  };

  const closeError = () => {
    setError({
      ...error,
      isError: false,
    });
  };

  return (
    <section className="flex flex-col">
      <Alert
        color="danger"
        description={error.message}
        isVisible={error.isError}
        title={error.title}
        variant="faded"
        onClose={closeError}
      />
      <div className="items-center text-center justify-center w-full">
        <div className="my-4">
          <span className={title({ color: "pink" })}>Brighte&nbsp;</span>
          <span className={title({ color: "green" })}>Eats&nbsp;</span>
        </div>
        <div className="my-4">
          <Form
            className="w-full text-center items-center justify-center"
            validationBehavior="native"
            onSubmit={onSubmit}
          >
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  label="Name"
                  name="name"
                  size="sm"
                  type="text"
                  value={user.name}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  size="sm"
                  type="email"
                  value={user.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  label="Mobile No."
                  name="mobile"
                  size="sm"
                  type="text"
                  value={user.mobile}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  isRequired
                  label="Postcode"
                  name="postcode"
                  size="sm"
                  type="text"
                  value={user.postcode}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <RadioGroup
                  isRequired
                  label="Which service type do you prefer?"
                  name="service_type"
                  value={user.service_type}
                  onChange={onInputChange}
                >
                  <Radio
                    checked={user.service_type === SERVICE_TYPE.DELIVERY}
                    value={SERVICE_TYPE.DELIVERY}
                  >
                    DELIVERY
                  </Radio>
                  <Radio
                    checked={user.service_type === SERVICE_TYPE.PICKUP}
                    value={SERVICE_TYPE.PICKUP}
                  >
                    PICK-UP
                  </Radio>
                  <Radio
                    checked={user.service_type === SERVICE_TYPE.PAYMENT}
                    value={SERVICE_TYPE.PAYMENT}
                  >
                    PAYMENT
                  </Radio>
                </RadioGroup>
              </div>
            </div>
            <Button
              className="w-full my-2"
              size="md"
              type="submit"
              variant="bordered"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}
