import { aboutUsContent } from "@/contents/about_us";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Target,
  BookOpen,
  Code,
  MessageSquare,
  Globe,
  Lightbulb,
  Shield,
  TrendingUp,
  Coffee,
  Github,
  Twitter,
  Mail,
} from "lucide-react";
import { Icons } from "@/components/icons";

export const About = () => {
  // Community stats (simulated)
  const communityStats = [
    {
      icon: Users,
      label: "Active Members",
      value: "10,000+",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: MessageSquare,
      label: "Discussions",
      value: "50,000+",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Code,
      label: "Code Snippets",
      value: "25,000+",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Globe,
      label: "Countries",
      value: "150+",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  // Feature highlights
  const features = [
    {
      icon: Lightbulb,
      title: "Knowledge Sharing",
      description: "Share your expertise and learn from others in our collaborative environment.",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Our community guidelines ensure a respectful and welcoming space for everyone.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Connect with mentors, find opportunities, and advance your development career.",
    },
    {
      icon: Coffee,
      title: "Casual Discussions",
      description: "Not just code - chat about tech trends, career advice, and life as a developer.",
    },
  ];

  return (
    <div className="w-full mx-auto px-6 space-y-16 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-6">
          <Icons.Logo className="w-10 h-10" />
        </div>
        <h1 className="text-5xl font-bold">{aboutUsContent.hero.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {aboutUsContent.hero.subtitle}
        </p>
      </div>

      {/* Community Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {communityStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Mission and Story */}
        <div className="space-y-8">
          {aboutUsContent.sections.slice(0, 2).map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {index === 0 ? (
                    <Target className="w-5 h-5 text-primary" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-primary" />
                  )}
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Values Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>{aboutUsContent.sections[2].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aboutUsContent.sections[2].items?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Features and Team */}
        <div className="space-y-8">
          {/* What We Offer */}
          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aboutUsContent.team.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  We're always looking for passionate developers to join our community!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connect With Us */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-semibold">Connect With Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow our journey and stay updated with the latest community news and features.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
      </section>
    </div>
  );
};
