import React from 'react';
import { cn } from '../lib/utils';
import { LearningStyle } from '../types';
import { Eye, Headphones, BookOpen, Hand } from 'lucide-react';

interface LearnerTypeWrapperProps {
  learnerStyle: LearningStyle;
  children: React.ReactNode;
  className?: string;
}

/**
 * Visual Learner Component
 * Features: Diagrams, colors, charts, infographics
 */
export function VisualContent({ children, className }: any) {
  return (
    <div className={cn(
      'rounded-2xl border-2 border-blue-200 bg-blue-50 p-4',
      'shadow-sm transition-all hover:border-blue-400 hover:shadow-md',
      className
    )}>
      <div className="mb-3 flex items-center gap-2">
        <Eye className="text-blue-600" size={18} />
        <span className="text-xs font-bold uppercase text-blue-600">Visual Learning</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Auditory Learner Component
 * Features: Explanations, discussions, mnemonics
 */
export function AuditoryContent({ children, className }: any) {
  return (
    <div className={cn(
      'rounded-2xl border-2 border-purple-200 bg-purple-50 p-4',
      'shadow-sm transition-all hover:border-purple-400 hover:shadow-md',
      className
    )}>
      <div className="mb-3 flex items-center gap-2">
        <Headphones className="text-purple-600" size={18} />
        <span className="text-xs font-bold uppercase text-purple-600">Auditory Learning</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Read/Write Learner Component
 * Features: Text, notes, lists, definitions
 */
export function ReadWriteContent({ children, className }: any) {
  return (
    <div className={cn(
      'rounded-2xl border-2 border-green-200 bg-green-50 p-4',
      'shadow-sm transition-all hover:border-green-400 hover:shadow-md',
      className
    )}>
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="text-green-600" size={18} />
        <span className="text-xs font-bold uppercase text-green-600">Read/Write</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Kinesthetic Learner Component
 * Features: Interactive, hands-on, simulations, games
 */
export function KinestheticContent({ children, className }: any) {
  return (
    <div className={cn(
      'rounded-2xl border-2 border-orange-200 bg-orange-50 p-4',
      'shadow-sm transition-all hover:border-orange-400 hover:shadow-md',
      className
    )}>
      <div className="mb-3 flex items-center gap-2">
        <Hand className="text-orange-600" size={18} />
        <span className="text-xs font-bold uppercase text-orange-600">Kinesthetic</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Adaptive Content Renderer
 * Automatically adapts presentation based on learning style
 */
interface AdaptiveContentProps {
  visual?: React.ReactNode;
  auditory?: React.ReactNode;
  readWrite?: React.ReactNode;
  kinesthetic?: React.ReactNode;
  learnerStyle: LearningStyle;
}

export function AdaptiveContent({
  visual,
  auditory,
  readWrite,
  kinesthetic,
  learnerStyle
}: AdaptiveContentProps) {
  if (learnerStyle === 'visual' && visual) {
    return <VisualContent>{visual}</VisualContent>;
  }
  if (learnerStyle === 'auditory' && auditory) {
    return <AuditoryContent>{auditory}</AuditoryContent>;
  }
  if (learnerStyle === 'readWrite' && readWrite) {
    return <ReadWriteContent>{readWrite}</ReadWriteContent>;
  }
  if (learnerStyle === 'kinesthetic' && kinesthetic) {
    return <KinestheticContent>{kinesthetic}</KinestheticContent>;
  }

  // Fallback for mixed or missing content
  return (
    <div className="space-y-3">
      {visual && <VisualContent>{visual}</VisualContent>}
      {auditory && <AuditoryContent>{auditory}</AuditoryContent>}
      {readWrite && <ReadWriteContent>{readWrite}</ReadWriteContent>}
      {kinesthetic && <KinestheticContent>{kinesthetic}</KinestheticContent>}
    </div>
  );
}

/**
 * Multi-Modal Learning Display
 * Shows content in multiple formats for better retention
 */
interface MultiModalContentProps {
  title: string;
  description?: string;
  content: {
    visual?: React.ReactNode;
    auditory?: React.ReactNode;
    readWrite?: React.ReactNode;
    kinesthetic?: React.ReactNode;
  };
}

export function MultiModalContent({ title, description, content }: MultiModalContentProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-1 text-lg font-bold text-slate-900">{title}</h3>
        {description && <p className="text-sm text-slate-600">{description}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {content.visual && (
          <VisualContent>
            <div className="text-sm">{content.visual}</div>
          </VisualContent>
        )}
        {content.auditory && (
          <AuditoryContent>
            <div className="text-sm">{content.auditory}</div>
          </AuditoryContent>
        )}
        {content.readWrite && (
          <ReadWriteContent>
            <div className="text-sm">{content.readWrite}</div>
          </ReadWriteContent>
        )}
        {content.kinesthetic && (
          <KinestheticContent>
            <div className="text-sm">{content.kinesthetic}</div>
          </KinestheticContent>
        )}
      </div>
    </div>
  );
}
