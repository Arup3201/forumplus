import React, { useState } from "react";
import { contactContent } from "@/contents/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MessageSquare,
  Shield,
  Briefcase,
  HelpCircle,
  Code,
  SearchIcon,
  Clock,
  MapPin,
  ExternalLink,
  Send,
} from "lucide-react";

// Icon mapping for contact methods and quick help
const iconMap = {
  mail: Mail,
  wrench: Code,
  shield: Shield,
  briefcase: Briefcase,
  "help-circle": HelpCircle,
  book: Code,
  search: SearchIcon,
  twitter: ExternalLink,
  github: ExternalLink,
  discord: ExternalLink,
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="w-full mx-auto px-6 space-y-12 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{contactContent.hero.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {contactContent.hero.subtitle}
        </p>
      </div>

      {/* Contact Methods */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactContent.contactMethods.map((method, index) => {
            const IconComponent = iconMap[method.icon as keyof typeof iconMap] || Mail;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                      <a
                        href={`mailto:${method.value}`}
                        className="text-primary hover:underline font-medium mt-2 block"
                      >
                        {method.value}
                      </a>
                      <Badge variant="outline" className="mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {method.responseTime}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Help Resources */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">{contactContent.quickHelp.title}</h2>
          <p className="text-muted-foreground">{contactContent.quickHelp.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactContent.quickHelp.resources.map((resource, index) => {
            const IconComponent = iconMap[resource.icon as keyof typeof iconMap] || HelpCircle;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-secondary rounded-lg">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {resource.description}
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2">
                        Learn more <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{contactContent.contactForm.title}</CardTitle>
              <p className="text-muted-foreground">{contactContent.contactForm.subtitle}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactContent.contactForm.fields[2].options?.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your question or issue in detail..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{contactContent.officeInfo.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p>{contactContent.officeInfo.address.street}</p>
                <p>
                  {contactContent.officeInfo.address.city}, {contactContent.officeInfo.address.state} {contactContent.officeInfo.address.zip}
                </p>
                <p>{contactContent.officeInfo.address.country}</p>
              </div>
              <p className="text-muted-foreground text-sm italic">
                {contactContent.officeInfo.note}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{contactContent.socialMedia.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contactContent.socialMedia.platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">{platform.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
