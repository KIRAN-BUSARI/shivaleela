"use client";

import React, { useState } from "react";
import Image from "next/image";

const caseStudies = [
  {
    id: 1,
    title: "Priya Found Her Voice",
    year: "2007-2008",
    content: `Children today face a host of challenges that threaten their emotional, physical, and mental well-being. Bullying, sexual abuse, cyber threats, and addiction are just a few of the growing issues facing them. These dangers can feel overwhelming and isolating for children, leaving them and their families unsure of how to respond or where to turn for help.

At Vakya Foundation, we believe the solution lies in prevention and awareness. Rather than waiting for the harm to occur, we intervene early with targeted, effective programs designed to educate and empower. Our mission is to arm every child, from the age of 5 to 18, with the knowledge, tools, and support needed to thrive in today's world.`,
  },
  {
    id: 2,
    title: "Aryan's Safe Online Journey",
    year: "2007-2008",
    content: `Aryan was a 12-year-old who loved playing online games and chatting with friends. However, he started receiving strange messages from someone claiming to be his age. The person tried to get personal information and made Aryan uncomfortable.

Through our Chiguru program, Aryan had learned about online safety and the warning signs of cyber predators. He immediately recognized the danger, blocked the person, and reported it to his parents and our support team. His quick action prevented a potentially harmful situation.

This case demonstrates how early education about cyber safety can empower children to protect themselves in the digital world. Aryan's story has been shared (with permission) to help other children recognize similar threats.`,
  },
  {
    id: 3,
    title: "Teacher's Lives Changed",
    year: "2007-2008",
    content: `Ms. Sharma, a school teacher with 15 years of experience, attended our educator training program. She learned to recognize signs of abuse and distress in students that she had previously missed.

Within weeks of the training, she noticed changes in a student's behavior - withdrawal, anxiety, and unexplained bruises. Using the protocols she learned, she approached the situation sensitively and helped connect the child with appropriate support services.

The intervention led to the child receiving professional help and the family getting counseling. Ms. Sharma now trains other teachers in her school, multiplying the impact of our program. She says, "This training didn't just change my teaching - it gave me tools to change lives."`,
  },
  {
    id: 4,
    title: "From Fear to Confidence",
    year: "2007-2008",
    content: `Meera was a quiet 14-year-old who was being bullied by older students at her school. She was afraid to speak up and started skipping school, leading to declining grades and increasing isolation.

When our team conducted a workshop at her school, Meera learned about her rights, how to set boundaries, and where to seek help. With support from our counselors and her school, she found the courage to report the bullying.

The school took action, the bullying stopped, and Meera slowly regained her confidence. Today, she's a peer mentor in our program, helping other students facing similar challenges. Her transformation from victim to advocate shows the power of timely intervention and support.`,
  },
  {
    id: 5,
    title: "Riya's Brighter, Safer Smile",
    year: "2007-2008",
    content: `Eight-year-old Riya seemed happy at school but was experiencing inappropriate touching from a relative during family visits. She didn't have the words to explain what was happening or understand that it was wrong.

After participating in our age-appropriate personal safety workshop, Riya learned about good touch and bad touch. She recognized what was happening to her and felt empowered to tell her mother, who immediately took action.

The family sought therapy, and appropriate measures were taken to ensure Riya's safety. Her mother later shared, "The workshop gave my daughter the language to tell me what I needed to know. It saved her from further harm." Riya is now thriving and has her bright smile back.`,
  },
];

const CaseStudy = () => {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0]);

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Banner Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src="/banner.png"
            alt="Children at Chiguru workshop"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Case Studies Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Case Study List */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  onClick={() => setSelectedCase(caseStudy)}
                  className={`p-4 rounded-lg  cursor-pointer transition-all duration-200 ${selectedCase.id === caseStudy.id
                    ? "bg-secondary shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-sm md:text-base mb-1 ${selectedCase.id === caseStudy.id
                          ? "text-gray-100"
                          : "text-gray-900"
                          }`}
                      >
                        {caseStudy.title}
                      </h3>
                      <p className="text-xs text-gray-500">{caseStudy.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Selected Case Study Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 border-l-4 border-primary shadow-sm">
              <div className="mb-4 pb-4 border-b-2 border-primary">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {selectedCase.title}
                </h3>
                <p className="text-sm text-gray-500">Read time - 3 min</p>
              </div>
              <div className="prose prose-gray max-w-none">
                {selectedCase.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-700 text-sm md:text-base leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;