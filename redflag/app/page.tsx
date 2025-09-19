"use client";

import { ArrowRight, BarChart, Bell, Shield, TrendingUp, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Appbar"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// A small helper for the new logo

export default function LandingPage() {
    // Animation variants for Framer Motion
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const router = useRouter();
    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return (
        <div className="bg-gray-50 text-gray-800">

            <main>
                {/* --- Hero Section --- */}
                <section className="pt-32 pb-20 text-center container mx-auto px-6">
                    <motion.div variants={fadeIn} initial="initial" animate="animate">
                        <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">🏆 Smart India Hackathon 2025</Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
                            Stop Student Dropouts <br />
                            <span className="text-red-600">Before They Happen.</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-8">
                            DropZero is an AI-powered early intervention system that identifies at-risk students weeks in advance, enabling timely counselling and support.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="bg-red-600 hover:bg-red-700"
                            onClick={() => isLoggedIn ? router.push('/mentor/dashboard') : router.push('/mentor/signin')}
                            >Mentor Dashboard</Button>
                            <Button size="lg" variant="outline"
                            onClick={() => isLoggedIn ? router.push('/admin/dashboard') : router.push('/admin/signin')}
                            >Admin Dashboard</Button>
                        </div>
                    </motion.div>
                </section>

                {/* --- Features / "Problem & Solution" Section --- */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="text-4xl font-bold tracking-tight">Why Students Slip Through The Cracks</h2>
                                <p className="mt-4 text-gray-600">Current systems only identify struggling students when it's already too late. DropZero provides a unified, proactive solution.</p>
                            </div>
                        </motion.div>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Users, title: "Unified Data", text: "Combines attendance, grades, and fees into a single, clear profile to spot cross-category issues." },
                                { icon: Zap, title: "Early Detection", text: "Our system flags at-risk students weeks before traditional methods, opening a critical window for intervention." },
                                { icon: Bell, title: "Proactive Alerts", text: "Mentors receive immediate, actionable alerts for students needing attention, right on their dashboard." }
                            ].map((feature, i) => (
                                <motion.div key={i} variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }} custom={i}>
                                    <Card className="text-center h-full">
                                        <CardHeader>
                                            <div className="mx-auto w-fit p-3 bg-red-100 rounded-lg">
                                                <feature.icon className="w-6 h-6 text-red-600" />
                                            </div>
                                            <CardTitle>{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600">{feature.text}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Final CTA --- */}
                <section className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
                            <h2 className="text-4xl font-bold tracking-tight">Ready to Make an Impact?</h2>
                            <p className="mt-4 text-gray-600 max-w-xl mx-auto">See how DropZero can transform your institution's student success rate.</p>
                            <Button size="lg" className="mt-8 bg-red-600 hover:bg-red-700">
                                Get Started <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-6 py-8 text-center">
                    <Logo />
                    <p className="mt-4 text-gray-400 text-sm">&copy; 2025 DropZero. All Rights Reserved. <br /> A project for the Smart India Hackathon.</p>
                </div>
            </footer>
        </div>
    );
}

// A simple Badge component since we aren't using shadcn's for this one
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${className}`}>
        {children}
    </div>
);