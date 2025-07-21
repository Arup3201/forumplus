import { aboutUsContent } from "@/contents/about-us";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const About = () => {
  // Community stats (simulated)
  const communityStats = [
    {
      icon: Icons.Users,
      label: "Active Members",
      value: "10,000+",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Icons.MessageSquare,
      label: "Discussions",
      value: "50,000+",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Icons.Code,
      label: "Code Snippets",
      value: "25,000+",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Icons.Globe,
      label: "Countries",
      value: "150+",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  // Feature highlights
  const features = [
    {
      icon: Icons.Lightbulb,
      title: "Knowledge Sharing",
      description: "Share your expertise and learn from others in our collaborative environment.",
    },
    {
      icon: Icons.Shield,
      title: "Safe Environment",
      description: "Our community guidelines ensure a respectful and welcoming space for everyone.",
    },
    {
      icon: Icons.TrendingUp,
      title: "Career Growth",
      description: "Connect with mentors, find opportunities, and advance your development career.",
    },
    {
      icon: Icons.Coffee,
      title: "Casual Discussions",
      description: "Not just code - chat about tech trends, career advice, and life as a developer.",
    },
  ];

  return (
    <div className="space-y-16 mx-auto px-6 pb-12 w-full">
      {/* Hero Section */}
      <div className="space-y-6 text-center">
        <div className="flex justify-center items-center mb-6">
          <Icons.Logo className="w-10 h-10" />
        </div>
        <h1 className="font-bold text-5xl">{aboutUsContent.hero.title}</h1>
        <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed">
          {aboutUsContent.hero.subtitle}
        </p>
      </div>

      {/* Community Stats */}
      <section className="gap-6 grid grid-cols-2 md:grid-cols-4">
        {communityStats.map((stat) => (
          <Card key={stat.value} className="hover:shadow-md text-center transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-2xl">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main Content Sections */}
      <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Mission and Story */}
        <div className="space-y-8">
          {aboutUsContent.sections.slice(0, 2).map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {section.title === aboutUsContent.sections[0].title ? (
                    <Icons.Target className="w-5 h-5 text-primary" />
                  ) : (
                    <Icons.BookOpen className="w-5 h-5 text-primary" />
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
                <Icons.Heart className="w-5 h-5 text-primary" />
                <span>{aboutUsContent.sections[2].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aboutUsContent.sections[2].items?.map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <div className="bg-primary mt-2 rounded-full w-2 h-2 shrink-0"></div>
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
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="mt-1 text-muted-foreground text-xs">
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
                {aboutUsContent.team.map((member) => (
                  <div key={member.name} className="text-center">
                    <div className="flex justify-center items-center bg-gradient-to-br from-primary to-primary/70 mx-auto mb-3 rounded-full w-16 h-16">
                      <Icons.Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-muted-foreground text-sm">
                  We're always looking for passionate developers to join our community!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connect With Us */}
      <section className="space-y-6 text-center">
        <h2 className="font-semibold text-2xl">Connect With Us</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Follow our journey and stay updated with the latest community news and features.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="sm">
            <Icons.Github className="mr-2 w-4 h-4" />
            GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Twitter className="mr-2 w-4 h-4" />
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Mail className="mr-2 w-4 h-4" />
            Email
          </Button>
        </div>
      </section>
    </div>
  );
};
