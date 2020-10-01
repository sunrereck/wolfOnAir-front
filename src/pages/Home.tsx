import React from "react";
import { RouteComponentProps } from "react-router-dom";

import HomeContainer from "@/components/organisms/HomeContainer";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Home({ history }: RouteComponentProps) {
  return (
    <PageTemplate>
      <HomeContainer history={history} />
    </PageTemplate>
  );
}
