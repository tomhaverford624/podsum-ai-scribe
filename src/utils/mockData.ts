
export const generateMockPodcastInfo = (url: string) => {
  const mockTitles = [
    "The Future of AI in Healthcare with Dr. Sarah Johnson",
    "Crypto Market Analysis with John Smith and Jane Doe",
    "Building Resilient Businesses in Uncertain Times",
    "The Psychology of Decision Making in Trading",
    "Blockchain Technology: Beyond the Hype",
  ];
  
  const mockDurations = ["1h 24min", "45min", "2h 10min", "58min", "1h 32min"];
  
  return {
    title: mockTitles[Math.floor(Math.random() * mockTitles.length)],
    thumbnail: `https://picsum.photos/seed/${encodeURIComponent(url)}/400/400`,
    duration: mockDurations[Math.floor(Math.random() * mockDurations.length)],
  };
};

export const generateMockSummary = () => {
  return {
    keyTakeaways: [
      "**Institutional investors** are increasingly allocating capital to cryptocurrencies despite market volatility, with a focus on Bitcoin and Ethereum as gateway assets.",
      "Regulatory clarity remains the **biggest hurdle** for widespread adoption, with significant regional differences in approach creating operational challenges for global crypto businesses.",
      "DeFi (Decentralized Finance) protocols are maturing beyond speculative use cases, with lending and yield-generating platforms showing **sustainable business models**.",
      "Layer 2 scaling solutions are critical for Ethereum's continued dominance in the smart contract space, with several promising technologies gaining traction.",
      "Central Bank Digital Currencies (CBDCs) could potentially coexist with decentralized cryptocurrencies, serving different market needs and use cases.",
      "Security concerns persist with several high-profile hacks highlighting the importance of thorough auditing and gradual scaling of blockchain projects.",
    ],
    
    topicSections: [
      {
        title: "On Scaling Ethereum Layer 1 and Blobs",
        content: "Ethereum's scaling strategy focuses on two parallel tracks: optimizing Layer 1 throughput and expanding data availability for Layer 2s. Layer 1 improvements include increasing gas limits, refining execution and consensus client performance, and implementing Verkle trees to enable stateless clients. These changes aim to boost transaction capacity while maintaining decentralization. Blob scaling, driven by EIP-4844, prioritizes affordable block space for rollups, with plans to incrementally raise blob capacity from 3 to 16 per block. The long-term vision involves **ZK-powered advancements**, such as enshrined rollups and recursive proofs, to achieve exponential scalability."
      },
      {
        title: "On Improving User Experience",
        content: "UX improvements target both end-users and developers. For end-users, initiatives include wallet abstraction, cross-chain interoperability standards, and faster finality via single-slot consensus. Layer 2s are encouraged to adopt unified address formats and gas fee models to reduce fragmentation. Security remains a priority, with efforts to standardize audit processes and mitigate risks like reentrancy attacks. Developers will see enhanced tooling, including better **debugging frameworks** and standardized APIs for rollup integration."
      },
      {
        title: "On Community Collaboration and Decentralized Governance",
        content: "The EOF debate highlighted the need for inclusive decision-making. The EF plans to formalize processes for gathering input from Layer 2 teams, DeFi protocols, and staking services before EIP finalization. Research forums will invite external experts to critique proposals, ensuring upgrades align with ecosystem needs. **Decentralized governance tools**, such as onchain signaling mechanisms, are being explored to supplement All Core Devs discussions. However, the EF acknowledges the necessity of decisive leadership when consensus stalls, as seen with the Fusaku prioritization."
      }
    ],
    
    timestampedChapters: [
      { timestamp: "00:00", title: "Introduction and market overview", url: "#" },
      { timestamp: "12:34", title: "Institutional adoption trends", url: "#" },
      { timestamp: "25:17", title: "Regulatory landscape analysis", url: "#" },
      { timestamp: "37:42", title: "DeFi innovations and challenges", url: "#" },
      { timestamp: "49:23", title: "Layer 2 scaling solutions", url: "#" },
      { timestamp: "58:15", title: "CBDCs and the future of money", url: "#" },
      { timestamp: "01:10:40", title: "Security considerations", url: "#" },
      { timestamp: "01:19:55", title: "Closing thoughts and predictions", url: "#" },
    ],
    
    fullTranscript: "This is a placeholder for the full transcript of the podcast episode. In a real implementation, this would contain the complete text transcription of the audio content. The transcript would be time-aligned with the audio and would include speaker identification. For demonstration purposes, we're using this placeholder text instead of a full transcript that would typically be several thousand words long."
  };
};

export const generateMockHistory = () => {
  return [
    {
      id: "1",
      title: "The Future of Cryptocurrency Markets with Alex Rivera",
      date: "May 3, 2025",
      thumbnail: "https://picsum.photos/seed/crypto1/400/400"
    },
    {
      id: "2",
      title: "Blockchain Technology: Separating Hype from Reality",
      date: "April 29, 2025",
      thumbnail: "https://picsum.photos/seed/blockchain2/400/400"
    },
    {
      id: "3",
      title: "DeFi Revolution: How Decentralized Finance is Changing Banking",
      date: "April 25, 2025",
      thumbnail: "https://picsum.photos/seed/defi3/400/400"
    },
    {
      id: "4",
      title: "NFTs and Digital Ownership in the Metaverse Era",
      date: "April 20, 2025",
      thumbnail: "https://picsum.photos/seed/nft4/400/400"
    },
    {
      id: "5",
      title: "Web3 Development: Building the Decentralized Internet",
      date: "April 15, 2025",
      thumbnail: "https://picsum.photos/seed/web35/400/400"
    }
  ];
};
