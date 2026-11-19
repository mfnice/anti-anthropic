import { JournalPage, journalMetadata, journalPaths, type JournalParams } from "@/components/JournalPage";

export const dynamicParams = false;
export const generateStaticParams = journalPaths;
export const generateMetadata = (props: JournalParams) => journalMetadata("en", props);

export default function Page({ params }: JournalParams) {
  return <JournalPage locale="en" params={params} />;
}
