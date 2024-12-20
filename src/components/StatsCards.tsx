import { Card } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import { PhoneIcon, TrendingUpIcon, FlameIcon, TrophyIcon } from "lucide-react";

interface StatsCardsProps {
  leads: Lead[];
}

export function StatsCards({ leads }: StatsCardsProps) {
  // Calculate stats based on lead statuses
  const followUps = leads.filter((lead) => lead.status === "contacted").length;
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((lead) => lead.status === "converted").length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const hotLeads = leads.filter((lead) => lead.status === "new").length;
  const recentWins = leads.filter((lead) => 
    lead.status === "converted" && 
    new Date(lead.registrationDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6 bg-blue-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <PhoneIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-blue-600 font-medium">Follow-ups</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold">{followUps}</h3>
              <p className="text-sm text-muted-foreground">Today!</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Every call brings kids closer to Winter Camp fun!
        </p>
      </Card>

      <Card className="p-6 bg-green-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUpIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-green-600 font-medium">Conversions</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold">{conversionRate}%</h3>
              <p className="text-sm text-muted-foreground">to Goal</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep the momentum going!
        </p>
      </Card>

      <Card className="p-6 bg-red-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <FlameIcon className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-red-600 font-medium">Hot Leads</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold">{hotLeads}</h3>
              <p className="text-sm text-muted-foreground">Ready!</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Strike while the iron is hot!
        </p>
      </Card>

      <Card className="p-6 bg-purple-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrophyIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-purple-600 font-medium">Recent Wins</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold">{recentWins}</h3>
              <p className="text-sm text-muted-foreground">Today!</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Amazing work! Keep closing!
        </p>
      </Card>
    </div>
  );
}