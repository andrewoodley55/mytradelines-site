import { CreditCard, Mail, Phone } from "lucide-react";

const links = [
  { label: "Tradelines", href: "#tradelines" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Sell", href: "#sell" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-border bg-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-blue" />
              <span className="text-xl font-bold text-white">MyTradelines</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your trusted tradeline broker. Buy seasoned authorized user tradelines to boost your
              credit — or earn money by selling yours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@mytradelines.com"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@mytradelines.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MyTradelines. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Tradelines are not guaranteed to produce specific credit score results. Individual
            outcomes vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
