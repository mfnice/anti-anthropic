import { LanguageProvider } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Hero from "@/components/Hero";
import Facts from "@/components/Facts";
import SubmitForm from "@/components/SubmitForm";
import CommentFeed from "@/components/CommentFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <CommentFeed />
        <LanguageSwitcher />
        <Hero />
        <Facts />
        <SubmitForm />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
