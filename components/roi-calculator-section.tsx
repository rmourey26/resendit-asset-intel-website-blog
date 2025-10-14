"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, Clock, Shield, Target, BarChart3, AlertTriangle, Building2 } from "lucide-react"

interface ComprehensiveROIInputs {
  // Organization Profile
  employees: number
  avgSalary: number
  industry: string
  companySize: string

  // Current Operations
  manualHours: number
  errorRate: number
  systemDowntime: number
  complianceCosts: number

  // Data & Infrastructure
  dataQuality: number
  integrationComplexity: number
  legacySystemAge: number
  cloudReadiness: number

  // Strategic Factors
  aiMaturity: number
  changeReadiness: number
  executiveSupport: number
  competitivePressure: number

  // Hidden Costs
  dataPreparationCosts: number
  trainingCosts: number
  maintenanceCosts: number
  securityCosts: number
}

interface ComprehensiveROIResults {
  currentAnnualCost: number
  resenditAnnualCost: number
  annualSavings: number
  roi: number
  paybackMonths: number
  threeYearSavings: number
  fiveYearValue: number

  // Detailed savings breakdown
  operationalSavings: number
  qualitySavings: number
  strategicValue: number
  hiddenCostReduction: number

  // Risk factors
  implementationRisk: number
  dataQualityRisk: number
  adoptionRisk: number

  // Performance metrics
  productivityGain: number
  errorReduction: number
  timeToValue: number
}

const subscriptionPlans = [
  {
    name: "Lite",
    monthly: 9,
    yearly: 108,
    monthlyStandard: 19,
    yearlyStandard: 228,
    features: ["100,000 AI tokens/month", "100 managed assets", "1 team member", "Basic support"],
    limits: { ai_tokens: 100000, managed_assets: 100, storage: 1, team_members: 1, api_calls: 1000 },
    isIntroductory: true,
  },
  {
    name: "Starter",
    monthly: 99,
    yearly: 990,
    features: ["1,000,000 AI tokens/month", "1,000 managed assets", "5 team members", "Basic analytics"],
    limits: { ai_tokens: 1000000, managed_assets: 1000, storage: 5, team_members: 5, api_calls: 10000 },
  },
  {
    name: "Professional",
    monthly: 299,
    yearly: 2990,
    features: [
      "10,000,000 AI tokens/month",
      "10,000 managed assets",
      "25 team members",
      "Advanced analytics",
      "API access",
    ],
    limits: { ai_tokens: 10000000, managed_assets: 10000, storage: 50, team_members: 25, api_calls: 100000 },
  },
  {
    name: "Enterprise",
    monthly: 999,
    yearly: 9990,
    features: [
      "Unlimited AI tokens",
      "Unlimited managed assets",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated support",
    ],
    limits: { ai_tokens: -1, managed_assets: -1, storage: 500, team_members: -1, api_calls: -1 },
  },
]

const industryMultipliers = {
  manufacturing: { complexity: 1.3, savings: 1.4, risk: 1.2 },
  retail: { complexity: 1.0, savings: 1.2, risk: 0.9 },
  healthcare: { complexity: 1.5, savings: 1.6, risk: 1.4 },
  finance: { complexity: 1.4, savings: 1.5, risk: 1.3 },
  logistics: { complexity: 1.2, savings: 1.7, risk: 1.1 },
  technology: { complexity: 0.8, savings: 1.1, risk: 0.7 },
  other: { complexity: 1.0, savings: 1.0, risk: 1.0 },
}

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<ComprehensiveROIInputs>({
    // Organization Profile
    employees: 50,
    avgSalary: 75000,
    industry: "manufacturing",
    companySize: "medium",

    // Current Operations
    manualHours: 20,
    errorRate: 5,
    systemDowntime: 2,
    complianceCosts: 50000,

    // Data & Infrastructure
    dataQuality: 60,
    integrationComplexity: 70,
    legacySystemAge: 5,
    cloudReadiness: 40,

    // Strategic Factors
    aiMaturity: 30,
    changeReadiness: 60,
    executiveSupport: 70,
    competitivePressure: 80,

    // Hidden Costs
    dataPreparationCosts: 100000,
    trainingCosts: 50000,
    maintenanceCosts: 75000,
    securityCosts: 25000,
  })

  const [selectedPlan, setSelectedPlan] = useState(0)
  const [results, setResults] = useState<ComprehensiveROIResults | null>(null)
  const [activeTab, setActiveTab] = useState("organization")

  const calculateComprehensiveROI = () => {
    const industryData = industryMultipliers[inputs.industry as keyof typeof industryMultipliers]

    // Current system costs with industry adjustments
    const manualLaborCost = (inputs.employees * inputs.avgSalary * (inputs.manualHours / 40)) / 52
    const errorCosts = (inputs.avgSalary * inputs.employees * (inputs.errorRate / 100)) / 12
    const downtimeCosts = (inputs.avgSalary * inputs.employees * (inputs.systemDowntime / 100)) / 12
    const dataQualityCosts = inputs.dataPreparationCosts * (1 - inputs.dataQuality / 100)
    const integrationPenalty = (inputs.integrationComplexity / 100) * 50000

    const currentAnnualCost =
      (manualLaborCost + errorCosts + downtimeCosts) * 12 +
      inputs.complianceCosts +
      inputs.maintenanceCosts +
      inputs.securityCosts +
      dataQualityCosts +
      integrationPenalty

    // AI transformation benefits with maturity and readiness factors
    const aiReadinessFactor = (inputs.aiMaturity + inputs.changeReadiness + inputs.executiveSupport) / 300
    const dataReadinessFactor = inputs.dataQuality / 100
    const cloudReadinessFactor = inputs.cloudReadiness / 100

    // Operational efficiency gains (30-80% based on readiness)
    const baseEfficiencyGain = 0.3 + aiReadinessFactor * 0.5
    const operationalSavings = manualLaborCost * 12 * baseEfficiencyGain * industryData.savings

    // Quality improvements (50-95% error reduction)
    const errorReductionRate = 0.5 + dataReadinessFactor * 0.45
    const qualitySavings = errorCosts * 12 * errorReductionRate

    // Strategic value (revenue growth, competitive advantage)
    const strategicMultiplier = inputs.competitivePressure / 100
    const strategicValue = inputs.avgSalary * inputs.employees * 0.15 * strategicMultiplier

    // Hidden cost reductions
    const hiddenCostReduction =
      inputs.dataPreparationCosts * 0.6 + inputs.trainingCosts * 0.4 + inputs.maintenanceCosts * 0.3

    // Resend-It platform costs
    const resenditSubscription = subscriptionPlans[selectedPlan].yearly
    const implementationCosts = resenditSubscription * 0.5 // One-time setup
    const ongoingOperationalCosts = resenditSubscription * 0.2 // 20% of subscription for ongoing ops

    const totalSavings = operationalSavings + qualitySavings + strategicValue + hiddenCostReduction
    const resenditAnnualCost = resenditSubscription + ongoingOperationalCosts
    const annualSavings = totalSavings - resenditAnnualCost

    // ROI calculations
    const totalInvestment = resenditSubscription + implementationCosts
    const roi = (annualSavings / totalInvestment) * 100
    const paybackMonths = totalInvestment / (annualSavings / 12)
    const threeYearSavings = annualSavings * 3 - implementationCosts
    const fiveYearValue = annualSavings * 5 - implementationCosts

    // Risk assessment
    const implementationRisk = ((100 - inputs.aiMaturity) * industryData.risk) / 100
    const dataQualityRisk = ((100 - inputs.dataQuality) / 100) * 50
    const adoptionRisk = ((100 - inputs.changeReadiness) / 100) * 30

    // Performance metrics
    const productivityGain = baseEfficiencyGain * 100
    const errorReduction = errorReductionRate * 100
    const timeToValue = Math.max(3, 12 - aiReadinessFactor * 6) // 3-12 months

    setResults({
      currentAnnualCost,
      resenditAnnualCost,
      annualSavings,
      roi,
      paybackMonths,
      threeYearSavings,
      fiveYearValue,
      operationalSavings,
      qualitySavings,
      strategicValue,
      hiddenCostReduction,
      implementationRisk,
      dataQualityRisk,
      adoptionRisk,
      productivityGain,
      errorReduction,
      timeToValue,
    })
  }

  useEffect(() => {
    calculateComprehensiveROI()
  }, [inputs, selectedPlan])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRiskColor = (risk: number) => {
    if (risk < 20) return "text-green-600 bg-green-50"
    if (risk < 40) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <section id="roi-calculator" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs md:text-sm">
              AI Transformation ROI Calculator
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Calculate Your <span className="text-blue-600">AI Transformation ROI</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive analysis of your transition from traditional systems to Resend-It's AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8 w-full">
          {/* Enhanced Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="xl:col-span-2 w-full"
          >
            <Card className="h-full w-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Building2 className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  AI Transformation Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="organization" className="text-xs md:text-sm">
                      Organization
                    </TabsTrigger>
                    <TabsTrigger value="operations" className="text-xs md:text-sm">
                      Operations
                    </TabsTrigger>
                    <TabsTrigger value="infrastructure" className="text-xs md:text-sm">
                      Infrastructure
                    </TabsTrigger>
                    <TabsTrigger value="strategy" className="text-xs md:text-sm">
                      Strategy
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="organization" className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employees" className="text-sm md:text-base">
                          Number of Employees
                        </Label>
                        <Input
                          id="employees"
                          type="number"
                          value={inputs.employees}
                          onChange={(e) =>
                            setInputs((prev) => ({ ...prev, employees: Number.parseInt(e.target.value) || 0 }))
                          }
                          className="text-base md:text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary" className="text-sm md:text-base">
                          Average Annual Salary
                        </Label>
                        <Input
                          id="salary"
                          type="number"
                          value={inputs.avgSalary}
                          onChange={(e) =>
                            setInputs((prev) => ({ ...prev, avgSalary: Number.parseInt(e.target.value) || 0 }))
                          }
                          className="text-base md:text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base">Industry</Label>
                        <Select
                          value={inputs.industry}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, industry: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base">Company Size</Label>
                        <Select
                          value={inputs.companySize}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, companySize: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (1-50 employees)</SelectItem>
                            <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                            <SelectItem value="large">Large (500+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="operations" className="space-y-4 md:space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">
                          Manual Asset Management Hours/Week: {inputs.manualHours}
                        </Label>
                        <Slider
                          value={[inputs.manualHours]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, manualHours: value[0] }))}
                          max={40}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">Error Rate (%): {inputs.errorRate}%</Label>
                        <Slider
                          value={[inputs.errorRate]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, errorRate: value[0] }))}
                          max={20}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">System Downtime (%): {inputs.systemDowntime}%</Label>
                        <Slider
                          value={[inputs.systemDowntime]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, systemDowntime: value[0] }))}
                          max={10}
                          min={0.1}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="compliance" className="text-sm md:text-base">
                          Annual Compliance Costs
                        </Label>
                        <Input
                          id="compliance"
                          type="number"
                          value={inputs.complianceCosts}
                          onChange={(e) =>
                            setInputs((prev) => ({ ...prev, complianceCosts: Number.parseInt(e.target.value) || 0 }))
                          }
                          className="text-base md:text-lg"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="infrastructure" className="space-y-4 md:space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">Data Quality Score: {inputs.dataQuality}%</Label>
                        <Slider
                          value={[inputs.dataQuality]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, dataQuality: value[0] }))}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">
                          Integration Complexity: {inputs.integrationComplexity}%
                        </Label>
                        <Slider
                          value={[inputs.integrationComplexity]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, integrationComplexity: value[0] }))}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">
                          Legacy System Age (years): {inputs.legacySystemAge}
                        </Label>
                        <Slider
                          value={[inputs.legacySystemAge]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, legacySystemAge: value[0] }))}
                          max={20}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">Cloud Readiness: {inputs.cloudReadiness}%</Label>
                        <Slider
                          value={[inputs.cloudReadiness]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, cloudReadiness: value[0] }))}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="strategy" className="space-y-4 md:space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">AI Maturity Level: {inputs.aiMaturity}%</Label>
                        <Slider
                          value={[inputs.aiMaturity]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, aiMaturity: value[0] }))}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">Change Readiness: {inputs.changeReadiness}%</Label>
                        <Slider
                          value={[inputs.changeReadiness]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, changeReadiness: value[0] }))}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">Executive Support: {inputs.executiveSupport}%</Label>
                        <Slider
                          value={[inputs.executiveSupport]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, executiveSupport: value[0] }))}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm md:text-base">
                          Competitive Pressure: {inputs.competitivePressure}%
                        </Label>
                        <Slider
                          value={[inputs.competitivePressure]}
                          onValueChange={(value) => setInputs((prev) => ({ ...prev, competitivePressure: value[0] }))}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Subscription Plan Selection */}
                <div className="space-y-3 mt-6 pt-6 border-t">
                  <Label className="text-sm md:text-base">Select Resend-It Plan</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {subscriptionPlans.map((plan, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPlan(index)}
                        className={`p-3 rounded-lg border text-left transition-all w-full ${
                          selectedPlan === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-sm md:text-base">{plan.name}</span>
                            <div className="text-xs text-gray-600">
                              {plan.limits.ai_tokens === -1 ? "Unlimited" : `${plan.limits.ai_tokens.toLocaleString()}`}{" "}
                              AI tokens/month
                            </div>
                          </div>
                          <div className="text-right">
                            {plan.isIntroductory ? (
                              <>
                                <span className="text-blue-600 font-bold text-sm md:text-base block">
                                  {formatCurrency(plan.yearly)}/yr
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  {formatCurrency(plan.yearlyStandard!)}/yr
                                </span>
                              </>
                            ) : (
                              <span className="text-blue-600 font-bold text-sm md:text-base">
                                {formatCurrency(plan.yearly)}/yr
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card className="h-full w-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  Comprehensive ROI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                {results && (
                  <div className="space-y-4 md:space-y-6 w-full">
                    {/* Key Metrics */}
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
                      <div className="text-sm text-gray-600 mb-1">Annual Savings</div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 break-all">
                        {formatCurrency(results.annualSavings)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {results.roi > 0 ? `${results.roi.toFixed(0)}% ROI` : "Investment Required"}
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Productivity Gain</div>
                        <div className="text-lg font-bold text-green-600">{results.productivityGain.toFixed(0)}%</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Shield className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Error Reduction</div>
                        <div className="text-lg font-bold text-blue-600">{results.errorReduction.toFixed(0)}%</div>
                      </div>
                    </div>

                    {/* Savings Breakdown */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Savings Breakdown:</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Operational Efficiency:</span>
                          <span className="font-semibold">{formatCurrency(results.operationalSavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quality Improvements:</span>
                          <span className="font-semibold">{formatCurrency(results.qualitySavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Strategic Value:</span>
                          <span className="font-semibold">{formatCurrency(results.strategicValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hidden Cost Reduction:</span>
                          <span className="font-semibold">{formatCurrency(results.hiddenCostReduction)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Risk Assessment:
                      </h4>
                      <div className="space-y-1">
                        <div className={`text-xs p-2 rounded ${getRiskColor(results.implementationRisk)}`}>
                          Implementation Risk: {results.implementationRisk.toFixed(0)}%
                        </div>
                        <div className={`text-xs p-2 rounded ${getRiskColor(results.dataQualityRisk)}`}>
                          Data Quality Risk: {results.dataQualityRisk.toFixed(0)}%
                        </div>
                        <div className={`text-xs p-2 rounded ${getRiskColor(results.adoptionRisk)}`}>
                          Adoption Risk: {results.adoptionRisk.toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Clock className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Time to Value</div>
                        <div className="text-sm font-bold text-purple-600">{results.timeToValue.toFixed(0)} months</div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <Target className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Payback Period</div>
                        <div className="text-sm font-bold text-indigo-600">
                          {results.paybackMonths.toFixed(1)} months
                        </div>
                      </div>
                    </div>

                    {/* Long-term Value */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Long-term Value:</h4>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>3-Year Savings:</span>
                          <span className="font-semibold">{formatCurrency(results.threeYearSavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>5-Year Value:</span>
                          <span className="font-semibold">{formatCurrency(results.fiveYearValue)}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm">
                      Request Detailed ROI Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 px-4"
        >
          <p className="text-xs md:text-sm text-gray-600 max-w-4xl mx-auto">
            *Calculations based on comprehensive AI ROI research, industry benchmarks, and Resend-It platform
            capabilities. Results incorporate factors from data quality, organizational readiness, and industry-specific
            multipliers. Actual results may vary based on implementation approach and organizational factors.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
