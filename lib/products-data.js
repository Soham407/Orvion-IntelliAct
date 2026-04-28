export const products = [
  {
    slug: "control-safety-system",
    title: "Control and Safety Systems",
    image: "/images/2151977869.jpg",
    description: "SIL-rated safety and process control architectures for mission-critical operations.",
    content: {
      sections: [
        {
          title: "SCADA Systems",
          text: "Supcon InPlant SCADA software enhances Control and Safety Systems by supporting various network deployment methods, including C/S structure, B/S structure, and stand-alone monitoring. Depending on your specific network planning and business requirements, you can deploy roles such as servers and clients on the same computer or flexibly assign each node to different computers across various networks. This flexibility accommodates applications like Pipeline SCADA, Oil & Gas SCADA, Terminal Automation SCADA, General SCADA, and Pharmacy/Water SCADA.",
          items: ["C/S & B/S Structure support", "Standalone & Distributed Monitoring", "Flexible Node Deployment", "Multi-industry application support"]
        },
        {
          title: "DCS (Distributed Control Systems)",
          text: "Webfield ECS-700 supports up to 32 project management capabilities, 60 control domains, and 128 operational domain management, with each domain accommodating 60 stations. Each control station is designed to manage 4,000 I/Os. For small to medium enterprises, Webfield® JX-300XP simplifies architecture, enhancing reliability and efficiency while improving integrity and stability.",
          items: ["Webfield ECS-700 (High-End)", "Webfield JX-300XP (Mid-Range)", "Up to 4,000 I/Os per station", "Cross-region data acquisition"]
        },
        {
          title: "PLC & RTU Solutions",
          text: "The GCS-G3 features a highly compact design for small-point stand-alone control in harsh environments. The GCS-G5 leverages UCP communication networks with full redundancy design, suitable for decentralized sites ranging from single devices to regional projects. Our RTUs (G3) support high-density distributed applications perfectly aligned with Industrial Automation requirements.",
          items: ["GCS-G3: Compact & Harsh Environment ready", "GCS-G5 Pro: Full Redundancy & Redundant Networking", "UCP Communication Network", "High-density Distributed I/O"]
        },
        {
          title: "Safety PLC (SIL-3)",
          text: "Webfield® TCS-900 (SIL-3) offers a comprehensive suite of solutions to protect personnel, assets, and production processes. These include Emergency Shutdown Devices (ESD), Fire & Gas Systems (FGS), Compressor Control Systems (CCS), High Integrity Pressure Protection Systems (HIPPS), and Burner Management Systems (BMS).",
          items: ["Webfield TCS-900 (SIL-3)", "ESD, FGS, & CCS Applications", "HIPPS & BMS Support", "Nuclear & Petrochemical Grade Safety"]
        },
        {
          title: "SIL3 Barriers, Isolators & Relays",
          text: "The HD5500 series isolated barriers protect electrical signals in hazardous areas (Digital/Analog Input, HART, Frequency, Temperature). The HD2000 SIL3 relays manage switch signals with advanced triple redundancy and contact melting protection, supporting both single and double-loop operations.",
          items: ["HD5500 SIL3 Certified Barriers", "HD2000 SIL3 Relays (Triple Redundancy)", "HART & Temperature Conversion", "Contact Melting Protection Technology"]
        },
        {
          title: "HART Communicator & Surge Protection",
          text: "The SupX600 series is an interactive calibrator and communicator with a 1080P touch screen and separable operation terminal. For equipment protection, the S Pro & P Pro series SPDs safeguard field sensors, transmitters, and I/O interfaces (AI, AO, DI, DO) in PLC, DCS, FGS, and ESD systems.",
          items: ["SupX600: Calibrator & HART Communicator", "1080P Capacitive Touch Interface", "S Pro & P Pro Surge Protection Devices", "I/O & Interface (RS485/232) Protection"]
        },
        {
          title: "Universal Control & Smart Remote I/O",
          text: "Our Universal Control System fits entire plant automation into a single cabinet using cloud-based, digitalized software. This reduces cabling and hardware on-site. The Smart Remote I/O / EIO further simplifies field-site setups, enhancing efficiency across the SCADA environment.",
          items: ["Cloud-based Universal Control", "Single Cabinet Plant Automation", "Smart Remote I/O / EIO", "Reduced Cabling & Hardware Footprint"]
        }
      ]
    }
  },
  {
    slug: "field-instruments",
    title: "Field Instruments & Valves",
    image: "/images/chemical 1.png",
    description: "High-precision measurement and control devices for the industrial field.",
    content: {
      sections: [
        {
          title: "Transmitters & Sensing",
          text: "We provide smart transmitters for pressure, flow, and level, including the CJT and CXT Series. The CXT Series utilizes monocrystalline piezoresistive sensors for 0.035% accuracy and supports Gauge, Hydrostatic, and Absolute measurements. Our W Series temperature transmitters support HART communication with LCD displays for RTD and Thermocouple sensors.",
          items: [
            "CJT & CXT Series Smart Transmitters (0.035% Accuracy)",
            "W Series Temperature Transmitters (4-20mA / HART)",
            "Direct, Flange, & Remote Seal Mounting options",
            "Wide Range Pressure Gauges (up to 60 Kg/cm²)",
            "Smart I-sensor GAS Detectors with LED display"
          ]
        },
        {
          title: "Valves & Positioners",
          text: "Our LN8 Series control valves feature AM8 multi-spring pneumatic diaphragm actuators, available in Triple Offset Butterfly, Rotary, and Ball types. The SUPFE300 series electric pneumatic positioners operate from 4–20 mA with split-range control and resonance-free operation up to 200 Hz.",
          items: [
            "LN8 Series: Triple Offset & Ball Control Valves",
            "SUPFE300 Series Electric Pneumatic Positioners",
            "AM8 Multi-spring Pneumatic Diaphragm Actuators",
            "CVP2000 Smart Valve Positioners",
            "Simple Zero & Range Adjustment Support"
          ]
        },
        {
          title: "Recording & Control Units",
          text: "The AR7000/AR7100 touch-screen recorders provide advanced data collection and analysis. Our process controllers (C1000, C3900, E6500) support Type II/III standard signals, TC, RTD, and Modbus/Ethernet protocols. High-precision X Series handheld calibrators are available for measuring voltage, current, and frequency.",
          items: [
            "AR7000/AR7100 Touch Screen Paperless Recorders",
            "C1000/C3900/E6500/C7000 Process Controllers",
            "E6500 Data Acquisition Units (60 function modules)",
            "X Series High-precision Handheld Calibrators",
            "KYN28-12 Electrical Cabinets (7.2-12KV)"
          ]
        }
      ]
    }
  },
  {
    slug: "flow-level-instruments",
    title: "Flow & Level Measurement",
    image: "/images/water scada.jpeg",
    description: "Specialized flowmeters and level gauges for accurate process inventory and monitoring.",
    content: {
      sections: [
        {
          title: "Radar & Level Sensing",
          text: "Our SL904 Series uses 120GHz Terahertz radar for +/- 1 mm accuracy. For long-range applications, we offer Guided Wave Radar (GWR) using Time Domain Reflectometry (TDR) for up to 30m. Level gauges include float (SL20), magnetostrictive (SL80), and magnetic (SL10) models.",
          items: [
            "SL904: 120GHz Terahertz Radar (+/- 1mm Accuracy)",
            "TDR Guided Wave Radar (3m to 30m Range)",
            "SL20/SL80/SL10 Level Gauges & Magnetostrictive meters",
            "SL30 Vibrating Fork Level Switches (DPDT Relay)",
            "Horn, Planner, Rod, & Lens Antenna options"
          ]
        },
        {
          title: "Flow Measurement Solutions",
          text: "We provide high-accuracy Vortex flowmeters with no moving parts, Turbine flow meters for ranges up to 6000 m³/Hr, and Tristate wave field Electromagnetic flowmeters with a 150:1 range ratio. Our SQI Series batch controllers ensure safe loading and unloading with anti-static and anti-overflow interlocking.",
          items: [
            "Vortex Flowmeters: High Accuracy & Low Pressure Loss",
            "Turbine Flow Meters (1.5\" to 12\" Sizes)",
            "Electromagnetic Flowmeters (150:1 Range Ratio)",
            "SQI Series Batch Controllers & Flow Sensors",
            "Smart Metal Tube Rotameters with Geomagnetic Compensation"
          ]
        }
      ]
    }
  },
  {
    slug: "fire-alarm-system",
    title: "Fire Alarm & Life Safety",
    image: "/images/46543.jpg",
    description: "Advanced fire detection, mass notification, and incident management systems for industrial environments.",
    content: {
      sections: [
        {
          title: "Edwards, GST & Kidde Platforms",
          text: "We provide the full EST4 flagship IPv6 platform, EST3X with Signature Voice EVAC, and iO Series analog systems. Our GST portfolio includes 1-8 loop panels and intrinsically safe detectors, while Kidde offers ModuLaser multi-channel aspirating smoke detection and addressable VS/FX series.",
          items: [
            "Edwards EST4 (IPv6) & EST3X (Voice EVAC)",
            "GST200N/IFP4E/IFP8 Intelligent Control Panels",
            "Kidde ModuLaser: Aspirating Smoke Detection",
            "Intrinsically Safe Photoelectric Detectors (DC-9101)",
            "Explosion Proof MCP & Dual IR Flame Detectors"
          ]
        },
        {
          title: "Incident Management (FireWorks)",
          text: "Our FireWorks platform is an integrated command and control hardware/software solution for mass notification and life safety. It provides real-time event notifications, intelligent reporting, and predictive maintenance dashboards for multi-site monitoring.",
          items: [
            "FireWorks Incident Management Command Center",
            "Mass Notification & Real-time Event Alerts",
            "Predictive Maintenance & Multi-site Dashboards",
            "Integrated Voice Evacuation Splitter Modules",
            "UL 268 7th Edition Compliance Monitoring"
          ]
        }
      ]
    }
  },
  {
    slug: "advanced-layer",
    title: "Advanced Layer (Ethernet-APL)",
    image: "/images/Software Industry.jpg",
    description: "The next generation of field connectivity with Ethernet-APL and software-defined I/O technology.",
    content: {
      sections: [
        {
          title: "Ethernet-APL Infrastructure",
          text: "Ethernet-APL brings high-speed 10Mbps data to hazardous areas. Our APL couplers and field switches support managed connectivity up to 1000m, featuring intrinsically safe (Ex ic) ports and IP66 Zone 2 protection.",
          items: [
            "Managed APL Couplers & Power Switches",
            "8/12-port Managed APL Field Switches (IP66)",
            "Intrinsically Safe (Ex ic) Field Port Protection",
            "Redundant Power & Long-Distance (1000m) Support",
            "APL Trunk Interface for seamless DCS integration"
          ]
        },
        {
          title: "SmartEIO & Wireless Gateways",
          text: "Our APL SmartEIO features 16 software-defined channels configurable for AI, AO, DI, DO, NAMUR, or PI. The APL Wireless Gateway supports 4G/5G SIM, RS-485, and 10M/100M BASE-T interfaces in explosion-proof (Ex ec) housings.",
          items: [
            "APL SmartEIO: 16-channel Software-defined I/O",
            "APL Wireless Gateway (4G/5G & SIM Support)",
            "CXT/TM Series Wireless Field Transmitters",
            "Configurable HART & Analog Signal Support",
            "Zone 2 Installation & IP66 Protection"
          ]
        }
      ]
    }
  },
  {
    slug: "analyser",
    title: "Industrial Analysers",
    image: "/images/oil+refinery+in+Atlanta-+GA.jpeg",
    description: "Energy efficiency and emission reduction through specialized gas and liquid analysis.",
    content: {
      sections: [
        {
          title: "Hobre (Netherlands) Specialist Solutions",
          text: "We deliver Netherlands-made HOBRE analysers for SAGD steam boiler efficiency, furnace air/fuel ratio management, and Wobbe Index analysis for blast furnace/coke oven gas. Our WIM COMPAS™ solution reduces VOC discharge from crude oil storage tanks through precision monitoring.",
          items: [
            "WIM COMPAS™: VOC Reduction & Storage Management",
            "Wobbe Index, CARI, & Calorific Value Analysis",
            "SAGD Steam-Generation Energy Optimization",
            "Flare Gas Environmental Compliance Measurement",
            "Air / Fuel Ratio Management for Furnaces & Turbines"
          ]
        },
        {
          title: "Combustion Optimization",
          text: "Utilize Wobbe Index and CARI analysis to stabilize furnace and boiler operations despite sudden fuel composition changes. We provide high-precision monitoring for flares with high H2 fluctuations to ensure waste gas elimination and environmental compliance.",
          items: [
            "Blast Furnace & Coke Oven Gas Analysis",
            "Stabilized Combustion via RTO & Loop Control",
            "High H2 Fluctuation Flare Monitoring",
            "Waste Gas Environmental Compliance",
            "Wobbe Index & CARI Expert Advisory"
          ]
        }
      ]
    }
  },
  {
    slug: "gas-detector",
    title: "Flame & Gas Detection",
    image: "/images/46543.jpg",
    description: "Protecting personnel and assets with reliable toxic, flammable gas and flame monitoring.",
    content: {
      sections: [
        {
          title: "Dräger Portable & Stationary Detection",
          text: "Our Dräger PAC 6000/8000/8500 series single and dual gas detectors cover CO, O2, H2S, Cl2, and more. For multi-gas needs, the X-am 8000 monitors up to 7 gases with Bluetooth and internal pump. Stationary PEX and Polytron 5000/8000 series offer LEL, IR, and PID sensing with HART/Modbus connectivity.",
          items: [
            "Dräger PAC Series: CO, O2, H2S, Cl2, HCN, NH3",
            "X-am 8000: 1-7 Multi-gas Monitoring (PID/IR/EC)",
            "Polytron 5000/8000: Stationary Detectors (HART/Modbus)",
            "PEX 3000: 100% LEL Flammable Gas Sensing",
            "Pulsar 7000: Open Path Hydrocarbon Detection"
          ]
        },
        {
          title: "Flame Detection Technology",
          text: "We provide high-speed triple IR and visual imaging flame detectors. The Flame 5000/3000 models include visual imaging and CCTV capabilities with SIL2 ratings, while the Flame 1500 uses Triple IR radiation sensing for rapid (4s) response in hazardous areas.",
          items: [
            "Flame 5000: Visual Imaging, CCTV, & SIL2",
            "Flame 1500: Triple IR Radiation Detection",
            "Wide 120° H / 80° V Field of View",
            "4-second Rapid Response Time",
            "Explosion-proof Hydrocarbon Sensing"
          ]
        }
      ]
    }
  },
  {
    slug: "electrical",
    title: "Electrical & Switchgear",
    image: "/images/engg 1.png",
    description: "MV/LV power distribution, motor control, and renewable energy kiosks.",
    content: {
      sections: [
        {
          title: "Medium Voltage Products (3.3KV - 33KV)",
          text: "Our MV portfolio includes VCB Breaker Panels (630A-4000A), Vacuum Contactor Panels for motor protection (up to 11KV), and compact RMUs. We provide integrated 33KV Kiosks and Unitized Package Sub-stations (USS) along with FCMA soft starters (up to 12KV) to reduce starting current.",
          items: [
            "VCB Breaker Panels: 3.3KV to 33KV",
            "Vacuum Contactor Panels (up to 11KV)",
            "FCMA Soft Starters (415V to 12KV)",
            "33KV Kiosks & Unitized Package Sub-stations (USS)",
            "Gas Insulated Switchgear (GIS) & RMU"
          ]
        },
        {
          title: "Low Voltage & Correction Panels",
          text: "We manufacture LT PCC/MCC panels with overload protection, APFC panels for automatic power factor correction, and VFD panels for motor speed/torque regulation. AMF and ATS panels are available for automatic main failure and transfer switching in emergency power scenarios.",
          items: [
            "LT PCC & MCC Panels (Short Circuit/Overload)",
            "APFC Panels: Automatic Power Factor Correction",
            "VFD Panels for AC Induction Motors",
            "AMF & ATS Emergency Restoration Panels",
            "MV/LV Integrated Sub-station Solutions"
          ]
        }
      ]
    }
  },
  {
    slug: "software",
    title: "Industrial Software & IIoT",
    image: "/images/Software Industry.jpg",
    description: "Digital transformation tools for Industry 4.0, predictive maintenance, and enterprise integration.",
    content: {
      sections: [
        {
          title: "Production & Material Management",
          text: "Our industrial software suite features modular production management for process monitoring, scheduling, and material management to maintain optimal inventory levels. These modules use real-time location tracking for workflow insights and streamlined operation management to improve plant efficiency.",
          items: [
            "Real-time Process Monitoring",
            "Advanced Production Scheduling",
            "Optimal Material & Process Management",
            "Workflow Efficiency Improvement",
            "Production Analysis & Insights"
          ]
        },
        {
          title: "Equipment & Health Management",
          text: "Utilize mobile applications for preventive maintenance, inspection management, and real-time asset tracking. Our system ensures integrated safety monitoring with hazard monitoring, hierarchy of controls for personnel positioning, and automated 'Permit to Work' logic.",
          items: [
            "Mobile-based Preventive Maintenance",
            "Integrated Safety & Hazard Monitoring",
            "Hierarchy of Personnel Positioning Controls",
            "Statistics & Real-time Asset Analysis",
            "Automated Permit To Work Workflows"
          ]
        },
        {
          title: "Energy, RTLS & LIMS",
          text: "We provide comprehensive energy statistics, balance analysis, and planning modules for efficiency enhancement. Our Real-Time Location Tracking (RTLS) includes SOS alarms and E-Fence safety features, while our Laboratory Information Management System (LIMS) standardizes business processes with automatic data acquisition and quality analysis.",
          items: [
            "Energy Balance Analysis & Scheduling",
            "RTLS: SOS Alarm, Attendance & E-Fence",
            "LIMS: Automatic Instrument Data Acquisition",
            "Cyber-secure Laboratory Workflows",
            "Historical Track & Surveillance Linkage"
          ]
        },
        {
          title: "Digital Twin & Visualisation",
          text: "Our Digital Twin solutions use GIS and WebGL modelling for high-fidelity data visibility. Integrated with command operations, RTLS, and LIMS, this platform provides enterprise-wide visualization of entire industrial workflows.",
          items: [
            "GIS & WebGL Based Modelling",
            "Unified Command Operations Interface",
            "Real-time Data Visibility & Tracing",
            "Enterprise-wide Workflow Visualization",
            "Seamless LIMS & RTLS Integration"
          ]
        }
      ]
    }
  },
  {
    slug: "cloud-solutions",
    title: "Cloud AI & Autonomy",
    image: "/images/Software Industry.jpg",
    description: "AI-driven cloud platforms for industrial predictive analysis and autonomous operations.",
    content: {
      sections: [
        {
          title: "TPT AI Engine",
          text: "The Time-Series Pre-training Transformer (TPT) is a single AI engine that fuses long/short-term predictions with dynamic steady-state simulation. It supports multi-scenario adaptation for operation evaluation, diagnosis, and batch application across different industrial units.",
          items: [
            "Time-Series Pre-training Transformer (TPT)",
            "Long & Short-term Predictive Fusion",
            "Dynamic Steady-state Simulation",
            "Multi-unit Batch Model Application",
            "Autonomous Operation Diagnosis"
          ]
        },
        {
          title: "AI Specialized Modules",
          text: "Our AI engine powers specialized solutions: PRIDE for equipment predictive analytics, OMC for intelligent operation management (Autonomous control), and Q Lab for full-process quality monitoring and enterprise-wide data visualization.",
          items: [
            "PRIDE: Equipment Predictive Analytics",
            "OMC: Autonomous Process Control",
            "Q Lab: Intelligent Quality Monitoring",
            "Zero Hardware Deployment (Public/SaaS)",
            "Scalable Operation Optimization"
          ]
        }
      ]
    }
  }
];
