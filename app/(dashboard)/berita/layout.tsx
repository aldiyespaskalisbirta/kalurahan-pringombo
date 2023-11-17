import { SearchInput } from "@/components/search-input";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function BeritaLayout({ children }: Props) {
  return <section className="p-6">
	<header>
		<SearchInput/>
	</header>
	<main>{children}</main>
  </section>;
}

export default BeritaLayout;
