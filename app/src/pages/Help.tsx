import { useState } from "react";
import { helpFAQContent } from "@/contents/help-faq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/icons";

export const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState(helpFAQContent.categories);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredFAQs(helpFAQContent.categories);
      return;
    }

    const filtered = helpFAQContent.categories
      .map(category => ({
        ...category,
        faqs: category.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(query.toLowerCase()) ||
            faq.answer.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter(category => category.faqs.length > 0);
    
    setFilteredFAQs(filtered);
  };

  // Additional help resources
  const helpResources = [
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: Icons.Video,
      color: "bg-blue-500/10 text-blue-600",
      link: "/tutorials",
    },
    {
      title: "User Guide",
      description: "Comprehensive documentation and guides",
      icon: Icons.Book,
      color: "bg-green-500/10 text-green-600",
      link: "/guide",
    },
    {
      title: "Community Forum",
      description: "Ask questions and get help from the community",
      icon: Icons.Users,
      color: "bg-purple-500/10 text-purple-600",
      link: "/",
    },
    {
      title: "Contact Support",
      description: "Get direct help from our support team",
      icon: Icons.Phone,
      color: "bg-orange-500/10 text-orange-600",
      link: "/contact",
    },
  ];

  // Popular topics
  const popularTopics = [
    { title: "Getting Started", count: 15 },
    { title: "Account Management", count: 12 },
    { title: "Posting Guidelines", count: 8 },
    { title: "Privacy Settings", count: 6 },
    { title: "Notifications", count: 5 },
  ];

  return (
    <div className="space-y-12 mx-auto px-6 pb-12 w-full">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Icons.HelpCircle className="w-8 h-8" />
          </div>
        </div>
        <h1 className="font-bold text-4xl">{helpFAQContent.hero.title}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
          {helpFAQContent.hero.subtitle}
        </p>
      </div>

      {/* Search Section */}
      <section className="mx-auto max-w-2xl">
        <div className="relative">
          <Icons.Search className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2 transform" />
          <Input
            placeholder="Search for help topics, questions, or keywords..."
            className="py-3 pl-10 w-full text-base"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-muted-foreground text-sm">
            {filteredFAQs.reduce((total, cat) => total + cat.faqs.length, 0)} results found for "{searchQuery}"
          </p>
        )}
      </section>

      <div className="gap-12 grid grid-cols-1 lg:grid-cols-3">
        {/* Main FAQ Section */}
        <section className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="mb-6 font-semibold text-2xl">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {filteredFAQs.map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Icons.FileText className="w-5 h-5" />
                      <span>{category.title}</span>
                      <Badge variant="secondary">{category.faqs.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq) => (
                        <AccordionItem key={faq.question} value={`faq-${category.title}-${faq.question}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-muted-foreground">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredFAQs.length === 0 && searchQuery && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icons.Search className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold text-lg">No results found</h3>
                  <p className="mb-4 text-muted-foreground">
                    We couldn't find any FAQ matching your search. Try different keywords or browse all categories.
                  </p>
                  <Button onClick={() => handleSearch("")} variant="outline">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <section className="space-y-6">
          {/* Help Resources */}
          <Card>
            <CardHeader>
              <CardTitle>More Help Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {helpResources.map((resource) => (
                <div
                  key={resource.title}
                  className="flex items-center space-x-3 hover:bg-muted p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${resource.color}`}>
                    <resource.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-muted-foreground text-xs">
                      {resource.description}
                    </p>
                  </div>
                  <Icons.ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularTopics.map((topic) => (
                <div
                  key={topic.title}
                  className="flex justify-between items-center hover:bg-muted p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <span className="font-medium text-sm">{topic.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {topic.count} FAQs
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="justify-start w-full" variant="outline">
                <Icons.MessageSquare className="mr-2 w-4 h-4" />
                Ask the Community
              </Button>
              <Button className="justify-start w-full" variant="outline">
                <Icons.Mail className="mr-2 w-4 h-4" />
                Contact Support
              </Button>
              <div className="pt-2 border-t">
                <p className="text-muted-foreground text-xs">
                  Can't find what you're looking for? Our support team is here to help!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Response Times */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Support Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community:</span>
                  <span>Usually within hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email Support:</span>
                  <span>24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgent Issues:</span>
                  <span>Within 6 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
