"use client";

import React from "react";
import {
  Button,
  TableHeader,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { title } from "@/components/primitives";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { LeadsQueryDocument } from "@/graphql/user";
import { Lead } from "../types/types";
import Link from "next/link";
import { API_URL } from "@/constants";

export default function App() {
  const { data, isLoading } = useQuery<{ leads: Lead[] }>({
    queryKey: ["leads"],
    queryFn: async () => request(API_URL, LeadsQueryDocument),
  });

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="items-center text-center justify-center w-full">
        <div className="my-4">
          <span className={title({ color: "pink" })}>Brighte&nbsp;</span>
          <span className={title({ color: "green" })}>Eats&nbsp;</span>
        </div>
        <div className="my-4">
          <Table aria-label="Leading Table">
            <TableHeader>
              <TableColumn>Service Type</TableColumn>
              <TableColumn>Total of interests</TableColumn>
            </TableHeader>
            {!isLoading && data?.leads && data?.leads.length ? (
              <TableBody isLoading={isLoading}>
                {data?.leads!.map((lead) => {
                  return (
                    <TableRow key={lead.service_type}>
                      <TableCell>{lead.service_type}</TableCell>
                      <TableCell>{lead.totalNoOfInterests}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
          </Table>
        </div>
        <div className="my-4">
          <Button color="default" variant="flat">
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
