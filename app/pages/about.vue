<template>
  <div class="py-8">
    <h1 class="text-3xl sm:text-4xl font-bold text-gold">About Chain Insights</h1>

    <div class="mt-8 prose prose-lg max-w-none">
      <p>
        <strong>Chain Insights</strong> is an autonomous on-chain intelligence platform
        built by <a href="https://github.com/chainswarm" target="_blank" rel="noopener">ChainSwarm</a>.
        Our flagship product, the <strong>Chain Insights Agent ($CIA)</strong>, continuously
        monitors blockchain activity, analyzes patterns using machine learning and
        graph-based reasoning, and delivers actionable intelligence to users.
      </p>

      <h2>What We're Building</h2>
      <p>
        The $CIA pipeline combines multiple technologies into a unified intelligence system:
      </p>
      <ul>
        <li><strong>On-chain Indexers</strong> &mdash; Real-time blockchain data ingestion across multiple chains</li>
        <li><strong>ML Analyzer</strong> &mdash; Pattern detection and anomaly scoring using machine learning models</li>
        <li><strong>GraphRAG Engine</strong> &mdash; Knowledge graph construction with retrieval-augmented generation</li>
        <li><strong>Agent Framework</strong> &mdash; Autonomous agents that synthesize findings and deliver insights</li>
      </ul>

      <h2>Why This Blog</h2>
      <p>
        We believe in building in the open. This blog is where we share our progress,
        dive deep into architectural decisions, discuss challenges we've faced, and
        document the lessons we've learned along the way.
      </p>

      <h2>Connect With Us</h2>
      <ul>
        <li><a href="https://chain-insights.chainswarm.xyz" target="_blank" rel="noopener">Chain Insights App</a></li>
        <li><a href="https://x.com/ChainInsightsAI" target="_blank" rel="noopener">Follow us on X / Twitter</a></li>
        <li><a href="https://github.com/chainswarm" target="_blank" rel="noopener">GitHub Organization</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Chain Insights Blog',
  meta: [
    { name: 'description', content: 'Learn about Chain Insights, the autonomous on-chain intelligence platform built by ChainSwarm.' },
  ],
})
</script>
