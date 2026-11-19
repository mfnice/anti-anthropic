import { JournalPage, journalMetadata, journalPaths, type JournalParams } from "@/components/JournalPage";

export const dynamicParams = false;
export const generateStaticParams = journalPaths;
export const generateMetadata = (props: JournalParams) => journalMetadata("es", props);

export default function Page({ params }: JournalParams) {
  return <JournalPage locale="es" params={params} />;
}
