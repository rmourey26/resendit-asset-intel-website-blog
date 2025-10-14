"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Database, Users, Zap, BarChart3, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export function AIROIFactorsSection() {
  const keyFactors = [
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Long-Term Strategic Perspective",
      description:
        "AI ROI is a dynamic journey with initial investments yielding lower immediate returns, but significant gains materializing over time as productivity improves and new revenue streams develop.",
      insight: "Move beyond short-term payback expectations to capitalize on compounding AI benefits",
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Data Quality & Governance Foundation",
      description:
        "Poor data quality is the primary cause of AI project failure. Robust data governance, preparation, and unified data infrastructure are prerequisites for reliable AI performance.",
      insight: "Data transformation must precede or run concurrently with AI adoption",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Hidden Cost Management",
      description:
        "Unpredictable operational costs, particularly cloud compute and data egress fees, can severely erode anticipated ROI without granular monitoring and advanced cost management.",
      insight: "Implement real-time visibility into unit costs to prevent budget overruns",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Strategic Vision & Process Reinvention",
      description:
        "The highest ROI comes from fundamentally rethinking core business processes with an 'AI-first' mindset, moving beyond mere automation to unlock new business models.",
      insight: "Challenge traditional operational paradigms and redesign workflows",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Organizational Readiness",
      description:
        "Human factors such as AI literacy, overcoming resistance, and fostering cross-functional collaboration are critical for successful enterprise-wide AI transitions.",
      insight: "Empower employees to enhance Return on Employee (ROE) and sustained value",
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-600" />,
      title: "Continuous Learning & Iteration",
      description:
        "Phased, iterative implementation with continuous monitoring, user feedback integration, and strong vendor partnerships ensures solutions remain optimized and relevant.",
      insight: "Test and learn approach with feedback loops maximizes long-term ROI",
    },
  ]

  const roiMetrics = [
    {
      metric: "Customer Acquisition Cost (CAC)",
      impact: "AI optimizes marketing spend and improves conversion rates",
      target: "3:1 CAC:LTV ratio",
    },
    {
      metric: "Customer Lifetime Value (LTV)",
      impact: "AI personalizes experiences and predicts churn patterns",
      target: "25-40% increase",
    },
    {
      metric: "Operational Efficiency",
      impact: "Agentic AI automates complex, unstructured processes",
      target: "25-35% productivity gains",
    },
    {
      metric: "Revenue Generation",
      impact: "AI-driven recommendations and dynamic pricing",
      target: "10-20% revenue uplift",
    },
  ]

  const realWorldExamples = [
    {
      company: "Siemens",
      result: "25% reduction in unplanned downtime",
      application: "Predictive maintenance with agentic AI",
    },
    {
      company: "Unilever",
      result: "10% inventory cost reduction, 7% transportation savings",
      application: "AI-powered supply chain automation",
    },
    {
      company: "General Mills",
      result: "$20M+ transportation savings, $50M projected waste reduction",
      application: "AI in logistics and manufacturing",
    },
    {
      company: "Microsoft Azure",
      result: "35,000 work hours saved, 25%+ productivity boost",
      application: "AI solutions for EchoStar Hughes",
    },
  ]

  return (
    <section id="ai-roi-factors" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            <TrendingUp className="h-4 w-4 mr-2" />
            AI ROI Factors
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Maximizing Return on Investment in the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              AI Transition
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the critical factors that influence ROI when transitioning from traditional computing systems
            to AI-powered platforms and SaaS subscriptions.
          </p>
        </motion.div>

        {/* Key Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {keyFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4">{factor.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{factor.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{factor.description}</p>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-indigo-800">{factor.insight}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROI Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Financial Metrics for AI Success</h3>
            <p className="text-lg text-gray-600">Critical metrics that drive AI platform and SaaS ROI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {roiMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-l-4 border-l-indigo-500 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{metric.metric}</h4>
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                        {metric.target}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{metric.impact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-World Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Proven Results Across Industries</h3>
            <p className="text-lg text-gray-600">Real-world examples of AI ROI in action</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {realWorldExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white to-indigo-50 border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <BarChart3 className="h-5 w-5 text-indigo-600 mr-2" />
                      <h4 className="text-lg font-semibold text-gray-900">{example.company}</h4>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mb-2">{example.result}</p>
                    <p className="text-gray-600 text-sm">{example.application}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Maximize Your AI ROI?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let Resend-It guide your transition with proven strategies and comprehensive platform capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#roi-calculator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Calculate Your ROI
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/signup"
                  className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200"
                >
                  Join Waitlist
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
