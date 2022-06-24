import { CheckCircle, Lock } from 'phosphor-react';
import { useMemo } from 'react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const params = useParams<{ slug: string }>();
  
  const isLessonAvailable = useMemo(() => {
    return isPast(availableAt);
  }, [availableAt]);

  const availableDateFormatted = useMemo(() => {
    return format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
      locale: ptBR,
    });
  }, [availableAt]);

  const isActiveLesson = slug === params.slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div 
        className={
          classNames('rounded border border-gray-500 p-4 mt-2', {
            'group-hover:border-green-500': !isActiveLesson,
            'bg-green-500': isActiveLesson,
          })
        }
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={
              classNames("text-sm font-medium flex items-center gap-2", {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })
            }>
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span className={
            classNames("text-xs rounded px-2 py-[0.125rem] text-white border font-bold", {
              'border-white': isActiveLesson,
              'border-green-300': !isActiveLesson,
            })
          }>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={
          classNames("mt-5 block", {
            'text-gray-200': !isActiveLesson,
            'text-white': isActiveLesson
          })
        }>
          {title}
        </strong>
      </div>
    </Link>
  );
}
