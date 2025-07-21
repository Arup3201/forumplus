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
import { Icons } from "@/components/icons";

// Icon mapping for contact methods and quick help
const iconMap = {
  mail: Icons.Mail,
  wrench: Icons.Code,
  shield: Icons.Shield,
  briefcase: Icons.Briefcase,
  "help-circle": Icons.HelpCircle,
  book: Icons.Code,
  search: Icons.Search,
  twitter: Icons.ExternalLink,
  github: Icons.ExternalLink,
  discord: Icons.ExternalLink,
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
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    <div className="space-y-12 mx-auto px-6 pb-12 w-full">
      {/* Hero Section */}
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-4xl">{contactContent.hero.title}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
          {contactContent.hero.subtitle}
        </p>
      </div>

      {/* Contact Methods */}
      <section className="space-y-6">
        <h2 className="font-semibold text-2xl text-center">Get in Touch</h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {contactContent.contactMethods.map((method) => {
            const IconComponent =
              iconMap[method.icon as keyof typeof iconMap] || Icons.Mail;
            return (
              <Card key={method.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {method.description}
                      </p>
                      <a
                        href={`mailto:${method.value}`}
                        className="block mt-2 font-medium text-primary hover:underline"
                      >
                        {method.value}
                      </a>
                      <Badge variant="outline" className="mt-2">
                        <Icons.Clock className="mr-1 w-3 h-3" />
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
        <div className="space-y-2 text-center">
          <h2 className="font-semibold text-2xl">
            {contactContent.quickHelp.title}
          </h2>
          <p className="text-muted-foreground">
            {contactContent.quickHelp.subtitle}
          </p>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          {contactContent.quickHelp.resources.map((resource) => {
            const IconComponent =
              iconMap[resource.icon as keyof typeof iconMap] ||
              Icons.HelpCircle;
            return (
              <Card
                key={resource.title}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary p-2 rounded-lg">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        {resource.description}
                      </p>
                      <Button variant="link" className="mt-2 p-0 h-auto">
                        Learn more{" "}
                        <Icons.ExternalLink className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {contactContent.contactForm.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {contactContent.contactForm.subtitle}
              </p>
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
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleInputChange("subject", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactContent.contactForm.fields[2].options?.map(
                        (option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        )
                      )}
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
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Icons.Send className="mr-2 w-4 h-4" />
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
                <Icons.MapPin className="w-5 h-5" />
                <span>{contactContent.officeInfo.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1 text-sm">
                <p>{contactContent.officeInfo.address.street}</p>
                <p>
                  {contactContent.officeInfo.address.city},{" "}
                  {contactContent.officeInfo.address.state}{" "}
                  {contactContent.officeInfo.address.zip}
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
                {contactContent.socialMedia.platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:bg-muted p-2 rounded-lg transition-colors"
                  >
                    <Icons.ExternalLink className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {platform.handle}
                      </p>
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
