"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Select from 'react-select'; // Import react-select

// Add countries data
const countries = [
  "United States 🇺🇸",
  "United Kingdom 🇬🇧",
  "Canada 🇨🇦",
  "Australia 🇦🇺",
  "Germany 🇩🇪",
  "France 🇫🇷",
  "Spain 🇪🇸",
  "Italy 🇮🇹",
  "Japan 🇯🇵",
  "China 🇨🇳",
  "India 🇮🇳",
  "Brazil 🇧🇷",
  "Mexico 🇲🇽",
  "South Africa 🇿🇦",
  "Nigeria 🇳🇬",
  "Russia 🇷🇺",
  "South Korea 🇰🇷",
  "Singapore 🇸🇬",
  "New Zealand 🇳🇿",
  "Ireland 🇮🇪",
  "Netherlands 🇳🇱",
  "Sweden 🇸🇪",
  "Norway 🇳🇴",
  "Denmark 🇩🇰",
  "Finland 🇫🇮",
  "Afghanistan 🇦🇫",
  "Albania 🇦🇱",
  "Algeria 🇩🇿",
  "Andorra 🇦🇩",
  "Angola 🇦🇴",
  "Argentina 🇦🇷",
  "Armenia 🇦🇲",
  "Austria 🇦🇹",
  "Azerbaijan 🇦🇿",
  "Bahamas 🇧🇸",
  "Bahrain 🇧ahrain",
  "Bangladesh 🇧🇩",
  "Barbados 🇧🇧",
  "Belarus 🇧🇾",
  "Belgium 🇧🇪",
  "Belize 🇧🇿",
  "Benin 🇧🇯",
  "Bhutan 🇧🇹",
  "Bolivia 🇧🇴",
  "Bosnia and Herzegovina 🇧🇦",
  "Botswana 🇧🇼",
  "Bulgaria 🇧🇬",
  "Burkina Faso 🇧🇫",
  "Burundi 🇧🇮",
  "Cabo Verde 🇨🇻",
  "Cambodia 🇰🇭",
  "Cameroon 🇨🇲",
  "Central African Republic 🇨🇫",
  "Chad 🇹🇩",
  "Chile 🇨🇱",
  "Colombia 🇨🇴",
  "Congo 🇨🇬",
  "Costa Rica 🇨🇷",
  "Croatia 🇭🇷",
  "Cuba 🇨🇺",
  "Cyprus 🇨🇾",
  "Czech Republic 🇨🇿",
  "Djibouti 🇩🇯",
  "Dominica 🇩🇲",
  "Dominican Republic 🇩🇴",
  "Ecuador 🇪🇨",
  "Egypt 🇪🇬",
  "El Salvador 🇸🇻",
  "Equatorial Guinea 🇬🇶",
  "Eritrea 🇪🇷",
  "Estonia 🇪🇪",
  "Eswatini 🇸🇿",
  "Ethiopia 🇪🇹",
  "Fiji 🇫🇯",
  "Gabon 🇬🇦",
  "Gambia 🇬🇲",
  "Georgia 🇬🇪",
  "Ghana 🇬🇭",
  "Greece 🇬🇷",
  "Grenada 🇬🇩",
  "Guatemala 🇬🇹",
  "Guinea 🇬🇳",
  "Guinea-Bissau 🇬🇼",
  "Guyana 🇬🇾",
  "Haiti 🇭🇹",
  "Honduras 🇭🇳",
  "Hungary 🇭🇺",
  "Iceland 🇮🇸",
  "Indonesia 🇮🇩",
  "Iran 🇮🇷",
  "Iraq 🇮🇶",
  "Israel 🇮🇱",
  "Ivory Coast 🇨🇮",
  "Jamaica 🇯🇲",
  "Jordan 🇯🇴",
  "Kazakhstan 🇰🇿",
  "Kenya 🇰🇪",
  "Kiribati 🇰🇮",
  "Kuwait 🇰🇼",
  "Kyrgyzstan 🇰🇬",
  "Laos 🇱🇦",
  "Latvia 🇱🇻",
  "Lebanon 🇱🇧",
  "Lesotho 🇱🇸",
  "Liberia 🇱🇷",
  "Libya 🇱🇾",
  "Liechtenstein 🇱🇮",
  "Lithuania 🇱🇹",
  "Luxembourg 🇱🇺",
  "Madagascar 🇲🇬",
  "Malawi 🇲🇼",
  "Malaysia 🇲🇾",
  "Maldives 🇲🇻",
  "Mali 🇲🇱",
  "Malta 🇲🇹",
  "Marshall Islands 🇲🇭",
  "Mauritania 🇲🇷",
  "Mauritius 🇲🇺",
  "Micronesia 🇫🇲",
  "Moldova 🇲🇩",
  "Monaco 🇲🇨",
  "Mongolia 🇲🇳",
  "Montenegro 🇲🇪",
  "Morocco 🇲🇦",
  "Mozambique 🇲🇿",
  "Myanmar 🇲🇲",
  "Namibia 🇳🇦",
  "Nauru 🇳🇷",
  "Nepal 🇳🇵",
  "Nicaragua 🇳🇮",
  "Niger 🇳🇪",
  "North Macedonia 🇲🇰",
  "Oman 🇴🇲",
  "Pakistan 🇵🇰",
  "Palau 🇵🇼",
  "Panama 🇵🇦",
  "Papua New Guinea 🇵🇬",
  "Paraguay 🇵🇾",
  "Peru 🇵🇪",
  "Philippines 🇵🇭",
  "Poland 🇵🇱",
  "Portugal 🇵🇹",
  "Qatar 🇶🇦",
  "Romania 🇷🇴",
  "Rwanda 🇷🇼",
  "Saint Kitts and Nevis 🇰🇳",
  "Saint Lucia 🇱🇨",
  "Saint Vincent and the Grenadines 🇻🇨",
  "Samoa 🇼🇸",
  "San Marino 🇸🇲",
  "Sao Tome and Principe 🇸🇹",
  "Saudi Arabia 🇸🇦",
  "Senegal 🇸🇳",
  "Serbia 🇷🇸",
  "Seychelles 🇸🇨",
  "Sierra Leone 🇸🇱",
  "Slovakia 🇸🇰",
  "Slovenia 🇸🇮",
  "Solomon Islands 🇸🇧",
  "Somalia 🇸🇴",
  "South Sudan 🇸🇸",
  "Sri Lanka 🇱🇰",
  "Sudan 🇸🇩",
  "Suriname 🇸🇷",
  "Switzerland 🇨🇭",
  "Syria 🇸🇾",
  "Taiwan 🇹🇼",
  "Tajikistan 🇹🇯",
  "Tanzania 🇹🇿",
  "Thailand 🇹🇭",
  "Timor-Leste 🇹🇱",
  "Togo 🇹🇬",
  "Tonga 🇹🇴",
  "Trinidad and Tobago 🇹🇹",
  "Tunisia 🇹🇳",
  "Turkey 🇹🇷",
  "Turkmenistan 🇹🇲",
  "Tuvalu 🇹🇻",
  "Uganda 🇺🇬",
  "Ukraine 🇺🇦",
  "United Arab Emirates 🇦🇪",
  "Uruguay 🇺🇾",
  "Uzbekistan 🇺🇿",
  "Vanuatu 🇻🇺",
  "Vatican City 🇻🇦",
  "Venezuela 🇻🇪",
  "Vietnam 🇻🇳",
  "Yemen 🇾🇪",
  "Zambia 🇿🇲",
  "Zimbabwe 🇿🇼",
].sort();

interface BetaSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetaSignupModal({ open, onOpenChange }: BetaSignupModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const countryOptions = countries.map(country => ({ value: country, label: country })); // Format countries for react-select
  const [selectedCountry, setSelectedCountry] = useState<any>(null); // State to hold selected country

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      country: selectedCountry?.value || '', // Use selected country value
    };

    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.status === 409) {
        toast({
          title: "Already Registered",
          description:
            "This email is already registered for the beta waitlist.",
          variant: "default",
        });
        onOpenChange(false);
      } else if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      } else {
        toast({
          title: "Success! 🎉",
          description:
            "You've been successfully added to the beta waitlist. We'll notify you when access is available.",
          variant: "default",
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem registering for the beta. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[95vw] sm:w-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Join the Beta
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign up to get early access to learn.sol
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                required
                className="bg-white/10 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                required
                className="bg-white/10 border-white/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-white/10 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(selectedOption) => setSelectedCountry(selectedOption)}
              placeholder="Select your country"
              isSearchable
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                }),
                input: (baseStyles) => ({
                  ...baseStyles,
                  color: 'white',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#1f1f1f',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#2f2f2f' : '#1f1f1f',
                  color: 'white',
                  ':active': {
                    backgroundColor: '#3f3f3f',
                  },
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: '#9ca3af',
                }),
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-black w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
