import React from 'react';
import { ProcessStep } from '@/lib/db/types';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="space-y-16">
      {steps.map((step, index) => {
        const isEven = index % 2 === 1;
        let deliverables: string[] = [];
        try {
          deliverables = JSON.parse(step.deliverables);
        } catch {
          deliverables = [];
        }

        return (
          <div
            key={step.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
              isEven ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Step Image */}
            <div
              className={`lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-[#EAE4DA] border border-[#1C1B1A]/8 ${
                isEven ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.image_url}
                alt={step.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 bg-[#1F1E1D]/90 text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold border border-white/10">
                Phase 0{step.step_number}
              </div>
            </div>

            {/* Step Content */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center ${
                isEven ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl lg:text-4xl font-editorial-heading text-[#9E7D4C]">
                  0{step.step_number}
                </span>
                <span className="w-8 h-[1px] bg-[#9E7D4C]/40" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#8C867F] font-medium">
                  {step.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-4">
                {step.title}
              </h3>

              <p className="text-base font-light text-[#5C5854] leading-relaxed mb-6">
                {step.description}
              </p>

              {deliverables.length > 0 && (
                <div className="p-5 bg-white border border-[#1C1B1A]/8 rounded-sm mb-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-3">
                    Key Phase Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5C5854] font-light">
                    {deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-[#9E7D4C] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="p-8 sm:p-10 bg-[#1F1E1D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-medium block mb-1">
            Ready to initiate Step 1?
          </span>
          <h4 className="text-2xl font-editorial-heading font-medium">
            Schedule your personalized design discovery session.
          </h4>
        </div>
        <Link
          href="/consultation"
          className="px-7 py-3.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <span>Request a Free Consultation</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
