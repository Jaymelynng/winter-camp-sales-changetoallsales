import { Card } from "@/components/ui/card";
import { Lead } from "@/types/lead";
import { UsersIcon, UserPlusIcon, TrendingUpIcon, TrophyIcon } from "lucide-react";

interface StatsCardsProps {
  leads: Lead[];
}

export function StatsCards({ leads }: StatsCardsProps) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const convertedLeads = leads.filter((lead) => lead.status === "converted").length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const todayConversions = leads.filter((lead) => 
    lead.status === "converted" && 
    new Date(lead.registration_date).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6 bg-white border-[#cec4c1]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#f9fafb] rounded-lg">
            <UsersIcon className="w-6 h-6 text-[#8f93a0]" />
          </div>
          <div>
            <p className="text-[#8f93a0] font-medium">Total Leads</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold text-[#b48f8f]">{totalLeads}</h3>
              <p className="text-sm text-[#8f93a0]">Total</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#8f93a0]">
          Keep building those relationships!
        </p>
      </Card>

      <Card className="p-6 bg-white border-[#cec4c1]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#f9fafb] rounded-lg">
            <UserPlusIcon className="w-6 h-6 text-[#8f93a0]" />
          </div>
          <div>
            <p className="text-[#8f93a0] font-medium">New Leads</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold text-[#b48f8f]">{newLeads}</h3>
              <p className="text-sm text-[#8f93a0]">To Contact</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#8f93a0]">
          Fresh opportunities await!
        </p>
      </Card>

      <Card className="p-6 bg-white border-[#cec4c1]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#f9fafb] rounded-lg">
            <TrendingUpIcon className="w-6 h-6 text-[#8f93a0]" />
          </div>
          <div>
            <p className="text-[#8f93a0] font-medium">Conversion Rate</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold text-[#b48f8f]">{conversionRate}%</h3>
              <p className="text-sm text-[#8f93a0]">Success</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#8f93a0]">
          Every conversation counts!
        </p>
      </Card>

      <Card className="p-6 bg-white border-[#cec4c1]">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#f9fafb] rounded-lg">
            <TrophyIcon className="w-6 h-6 text-[#8f93a0]" />
          </div>
          <div>
            <p className="text-[#8f93a0] font-medium">Today's Wins</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold text-[#b48f8f]">{todayConversions}</h3>
              <p className="text-sm text-[#8f93a0]">Signed Up</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#8f93a0]">
          Fantastic work today!
        </p>
      </Card>
    </div>
  );
}