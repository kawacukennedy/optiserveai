"use client"

import { useEffect } from "react"

interface CalBookingProps {
  isOpen: boolean
  onClose: () => void
}

export function CalBooking({ isOpen, onClose }: CalBookingProps) {
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Load Cal.com embed script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.innerHTML = `
        (function (C, A, L) { 
          let p = function (a, ar) { a.q.push(ar); }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.loaded) { 
              cal.ns = {}; 
              cal.q = cal.q || []; 
              d.head.appendChild(d.createElement("script")).src = A; 
              cal.loaded = true; 
            } 
            if (ar[0] === L) { 
              const api = function () { p(api, arguments); }; 
              const namespace = ar[1]; 
              api.q = api.q || []; 
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar); 
              return;
            } 
            p(cal, ar); 
          }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        Cal("init", "30min", {origin:"https://app.cal.com"});
        
        Cal.ns["30min"]("inline", {
          elementOrSelector:"#my-cal-inline-30min",
          config: {"layout":"month_view"},
          calLink: "kawacu-kent-vnfqcr/30min",
        });
        
        Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      `
      document.head.appendChild(script)

      // Cleanup function
      return () => {
        // Remove the script when component unmounts
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/75" onClick={onClose} />
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="dim-card p-6 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-primary-teal text-white hover:bg-primary-teal-light transition-colors"
            >
              ×
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-sf font-bold text-foreground mb-2">
                Schedule Your Demo
              </h2>
              <p className="text-foreground/70">
                Book a 30-minute consultation to see OptiServe AI in action
              </p>
            </div>

            {/* Cal.com embed */}
            <div 
              style={{width:'100%', height:'600px', overflow:'scroll'}} 
              id="my-cal-inline-30min"
              className="rounded-lg border border-primary-teal/20"
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
