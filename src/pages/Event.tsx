import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { Sidebar } from '../components/Sidebar';

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleToggleMobileMenuOpen() {
    setMobileMenuOpen((state) => !state);
  }

  useEffect(() => {
    document.body.style.overflowY = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header open={mobileMenuOpen} toggleOpen={handleToggleMobileMenuOpen} />
      <main className="flex flex-1">
        {slug ? <Player lessonSlug={slug} /> : <div className="flex-1" />}
        <Sidebar open={mobileMenuOpen} />
      </main>
    </div>
  );
}
