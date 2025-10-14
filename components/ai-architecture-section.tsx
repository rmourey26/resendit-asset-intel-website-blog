"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Network,
  Shield,
  Zap,
  GitBranch,
  Database,
  Lock,
  Globe,
  ArrowRight,
  Cpu,
  MessageSquare,
  Workflow,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const architectureFeatures = [
  {
    icon: Brain,
    title: "Agentic AI Orchestration",
    description:
      "Intelligent AI agents that autonomously coordinate asset tracking, lifecycle management, and optimization decisions across your entire operation.",
    technical: "Multi-agent system with specialized roles for tracking, analytics, compliance, and workflow automation",
  },
  {
    icon: Network,
    title: "Secure Agent Network",
    description:
      "Standardized communication protocols enable seamless collaboration between AI agents, sharing context and coordinating complex multi-step operations.",
    technical:
      "AetherNet protocol with E2EE messaging, WebSocket real-time coordination, and MQTT device communication",
  },
  {
    icon: Shield,
    title: "Zero-Trust Security",
    description:
      "End-to-end encryption, identity verification, and secure key management ensure your data and agent communications remain protected.",
    technical:
      "mTLS authentication, JWT tokens, payload encryption, and agent-managed private keys for Web3 interactions",
  },
  {
    icon: Database,
    title: "Context Exchange",
    description:
      "AI agents intelligently share relevant context, learning from each interaction to improve decision-making across the entire network.",
    technical: "Structured data exchange with task workflows, bidding systems, and real-time status synchronization",
  },
]

const currentApiFeatures = [
  {
    icon: Cpu,
    title: "AI Agent Management",
    description:
      "Create, configure, and deploy specialized AI agents with custom system prompts, tools, and parameters",
    endpoint: "/ai/agents",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Design multi-step workflows that coordinate between agents and external systems",
    endpoint: "/ai/workflows",
  },
  {
    icon: MessageSquare,
    title: "Agent Execution",
    description: "Execute agent tasks with real-time responses and structured data exchange",
    endpoint: "/ai/agents/{id}/execute",
  },
]

const futureCapabilities = [
  {
    icon: Globe,
    title: "Web3 Integration",
    description: "Blockchain-based asset provenance and smart contract automation for transparent, immutable tracking",
  },
  {
    icon: GitBranch,
    title: "Decentralized Coordination",
    description: "Distributed agent network with IPFS storage and cross-chain asset management capabilities",
  },
  {
    icon: Lock,
    title: "Autonomous Security",
    description:
      "Self-managing security protocols with agent-controlled private keys and decentralized identity verification",
  },
]

export function AIArchitectureSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
              AI Architecture
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Agentic AI
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform operates on a secure AI agent network that standardizes communication among AI agents,
              enabling unprecedented collaboration and context exchange for intelligent asset management.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Architecture Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {architectureFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600 font-mono">{feature.technical}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Current API Implementation */}
        {false && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Current API Implementation</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Today's platform runs on our comprehensive API that manages AI agents, workflows, and secure
                communication protocols.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {currentApiFeatures.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full border border-blue-200 hover:border-blue-300 transition-colors bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{feature.description}</p>
                      <div className="bg-slate-900 rounded-md p-3">
                        <code className="text-green-400 text-xs font-mono">{feature.endpoint}</code>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Future: AetherNet Integration */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Future: AetherNet Integration
            </Badge>
            <h3 className="text-3xl font-bold mb-4">Next-Generation Agent Network</h3>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're transitioning to AetherNet, a secure AI agent network with Web3 integration, decentralized
              coordination, and blockchain-based asset provenance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {futureCapabilities.map((capability, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-4">
                    <capability.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{capability.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{capability.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
            >
              Learn About AetherNet
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Technical Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Agentic AI Changes Everything</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Zap, title: "10x Faster", desc: "Autonomous decision-making eliminates human bottlenecks" },
                { icon: Brain, title: "Self-Learning", desc: "Agents improve performance through shared experiences" },
                { icon: Shield, title: "Zero Downtime", desc: "Distributed network ensures continuous operation" },
                { icon: Network, title: "Infinite Scale", desc: "Add agents dynamically as your operation grows" },
              ].map((benefit, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="p-6">
                    <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
