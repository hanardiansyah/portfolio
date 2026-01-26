// Tab switching functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize main navigation tabs
    initializeMainNav();
    // Initialize all skill tab containers
    initializeTabs();
    // Initialize project modals
    initializeProjectModals();
});

// Main Navigation Tab Switching (About, Skills, Projects)
function initializeMainNav() {
    const navTabs = document.querySelectorAll('.main-nav .nav-tab');
    const contentPanels = document.querySelectorAll('.content-panel');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetContent = this.getAttribute('data-content');

            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all content panels
            contentPanels.forEach(panel => panel.classList.remove('active'));

            // Show the corresponding content panel
            const targetPanel = document.getElementById(`${targetContent}-content`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function initializeTabs() {
    // Get all sections with tabs
    const sections = document.querySelectorAll('.skills-section');

    sections.forEach(section => {
        const tabs = section.querySelectorAll('.tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const tabId = this.getAttribute('data-tab');

                // Remove active class from all tabs in this section
                section.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all tab contents in this section
                section.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });

                // Show the corresponding tab content
                const targetContent = section.querySelector(`#${tabId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });
}

// Project data for modal popups
const projectData = {
    'dana-plus': {
        icon: '📊',
        title: 'DANA+ Onboarding Conversion Analysis',
        tags: ['Fintech', 'Mixpanel', 'A/B Testing', 'User Research', 'SQL', 'Python'],

        // Role clarification
        role: 'Product Data Analyst (metrics, funnel analysis, experiment evaluation)',

        // TL;DR for quick scanning
        tldr: [
            'Identified early funnel drop-off via Mixpanel',
            'Conducted 47 cold-call interviews to validate hypothesis',
            'Improved conversion by +48.92% through A/B testing'
        ],

        // Visual funnel chart
        funnelChart: {
            title: 'User Journey Funnel Analysis',
            stages: [
                { name: 'DANA+ Homepage Open', value: 100, users: '5,000', color: '#6366f1' },
                { name: 'Registration Page Open', value: 4.24, users: '212', color: '#8b5cf6' },
                { name: 'Registration Submit', value: 2.67, users: '143', color: '#a855f7' }
            ]
        },

        // Key metrics cards
        keyMetrics: [
            { label: 'Total Users Analyzed', value: '5,000', icon: '👥' },
            { label: 'Baseline Conversion', value: '2.67%', icon: '📉' },
            { label: 'Drop-off Rate Step 1→2', value: '95.76%', icon: '⚠️' },
            { label: 'Research Sample Size', value: '47 users', icon: '📞' }
        ],

        situation: `<p>In September 2024, DANA+ was opened to a public of <strong>5,000 whitelisted users</strong>. DANA+ is a value-added savings feature that allows users to earn <strong>daily investment returns</strong> through money market mutual funds with high liquidity.</p>
        <p style="margin-top: 12px;">However, initial Mixpanel data revealed critical issues:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Overall conversion rate was only <strong>2.67%</strong></li>
            <li>Massive drop-off (<strong>95.76%</strong>) between homepage open and registration page</li>
            <li>Users who reached registration page had relatively high completion rate (63%)</li>
        </ul>`,

        task: `<p>As the <strong>Product Data Analyst</strong> for onboarding performance, I was tasked to:</p>
        <ol style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Diagnose drop-off points</strong> — identify WHERE and WHY users abandon the funnel</li>
            <li><strong>Quantify user understanding</strong> — measure how well users understand the DANA+ value proposition</li>
            <li><strong>Design validation experiment</strong> — set up A/B test to measure impact of UX improvements</li>
            <li><strong>Give useful recommendations</strong> — share data-backed insights with UXD and Product team</li>
        </ol>`,

        // SQL code snippet
        codeSnippet: {
            title: 'Mixpanel Event Query (Simplified)',
            language: 'sql',
            code: `-- Funnel conversion analysis
SELECT 
    event_date,
    COUNT(DISTINCT CASE WHEN event = 'dana_plus_homepage_open' THEN user_id END) as step1_users,
    COUNT(DISTINCT CASE WHEN event = 'registration_page_open' THEN user_id END) as step2_users,
    COUNT(DISTINCT CASE WHEN event = 'registration_submit' THEN user_id END) as step3_users,
    ROUND(step2_users * 100.0 / step1_users, 2) as step1_to_2_rate,
    ROUND(step3_users * 100.0 / step2_users, 2) as step2_to_3_rate
FROM mixpanel_events
WHERE event_date BETWEEN '2024-09-01' AND '2024-09-30'
GROUP BY event_date;`
        },

        dataProcessing: [
            '<strong>Event Data Extraction:</strong> Pulled raw event logs from Mixpanel API covering 30-day period. Events tracked: <code>dana_plus_homepage_open</code>, <code>registration_page_open</code>, <code>registration_page_submit</code>, <code>registration_success</code>',
            '<strong>User Property Enrichment:</strong> Joined event data with user properties (account_age, total_balance, transaction_count, device_type) to enable cohort analysis',
            '<strong>Funnel Metrics Calculation:</strong> Computed step-by-step conversion rates with 95% confidence intervals. Identified Step 1→2 as critical bottleneck (95.76% drop-off)',
            '<strong>Cohort Segmentation:</strong> Created user segments for cold-call sampling: (1) opened but not registered, (2) frequent transactors, (3) dormant balance holders',
            '<strong>A/B Test Configuration:</strong> Set up experiment tracking with 80/20 split. Defined primary metric (registration_submit_rate), secondary metrics (time_to_convert, page_scroll_depth), and guardrail metrics (app_crash_rate)'
        ],

        // Research findings visualization
        researchFindings: {
            title: 'Cold-Call Research Findings (n=47)',
            mainStat: '65%',
            mainLabel: 'Don\'t understand what DANA+ is',
            findings: [
                { percentage: '42%', label: 'Confused with bank deposits' },
                { percentage: '31%', label: 'Thought it was risky investment' },
                { percentage: '27%', label: 'Unclear on daily returns benefit' }
            ],
            quotes: [
                '"Oh, so it\'s like an investment?"',
                '"Is this like a bank deposit?"',
                '"What\'s the difference from my regular DANA balance?"'
            ]
        },

        actions: [
            '<strong>Funnel Deep-Dive Analysis:</strong> Built Mixpanel dashboard tracking daily/weekly trends. Identified that drop-off was consistent across all user segments, suggesting a universal UX issue rather than segment-specific problem',
            '<strong>Cold-Call User Research (7–9 Oct 2024):</strong> Conducted <strong>47 phone interviews</strong> with whitelisted users who opened but didn\'t register. Used structured interview guide with screening questions about product understanding',
            '<strong>Quantitative Research Synthesis:</strong> Coded interview responses and found <strong>65% of users did not understand what DANA+ is</strong>. Users commonly confused the feature with bank deposits or perceived it as risky investment',
            '<strong>UI/UX Issue Identification:</strong> Documented 3 critical design issues: (1) <strong>Information overload</strong> — too many numbers displayed (5.2%, Rp412,759, +Rp58/day), (2) <strong>Missing context</strong> — no explanation of how returns work, (3) <strong>Weak CTA</strong> — "DAFTAR SEKARANG" button lacked compelling benefit statement',
            '<strong>A/B Experiment Design:</strong> Collaborated with UXD to create treatment variant with: comic-style educational illustrations, simplified benefit messaging ("Saldo bisa langsung dipakai transaksi!"), and conversational tone. Deployed 80/20 traffic split with 2-week observation window'
        ],

        // A/B test results visualization
        abTestResults: {
            title: 'A/B Test Results (2-week observation)',
            control: { name: 'Control (80%)', conversion: 19.61 },
            treatment: { name: 'New Onboarding (20%)', conversion: 25.67 },
            lift: '+31%',
            pValue: 'p < 0.05',
            stages: [
                { name: 'Homepage Open → Reg Page', control: 19.61, treatment: 25.67, lift: '+30.9%' },
                { name: 'Reg Page → Submit', control: 55.41, treatment: 48.92, lift: '-11.7%' },
                { name: 'Overall Conversion', control: 10.87, treatment: 12.56, lift: '+15.5%' }
            ]
        },

        resultHighlight: '+48.92% increase in registration page open rate',
        resultDescription: `<p>The new DANA+ onboarding achieved <strong>statistically significant improvements</strong> (p < 0.05) across key funnel metrics:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Homepage → Registration Page:</strong> 19.61% → 25.67% (+31% lift)</li>
            <li><strong>Overall funnel throughput:</strong> 10.87% → 12.56% (+15.5% lift)</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Key Insights:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Comic-style explanations helped users understand the product better</li>
            <li>Conversational tone made the product feel less complicated</li>
            <li>Results backed our hypothesis: helping users understand the product first is key to conversion</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Business Impact:</strong> Insights were used to prioritize onboarding redesign and validate rollout decisions. Recommendations were adopted for the full DANA+ rollout. Expected to bring in <strong>~15,000 more activations</strong> at scale.</p>`
    },
    'reksa-dana': {
        icon: '📈',
        title: 'Reksa Dana Onboarding Pre–Post Analysis',
        tags: ['Fintech', 'Mixpanel', 'Survey Research', 'A/B Testing', 'Benchmarking'],

        // Role clarification
        role: 'Product Data Analyst (survey research, benchmarking, A/B testing)',

        // TL;DR for quick scanning
        tldr: [
            'Surveyed 850 users to understand drop-off reasons',
            'Benchmarked 5 competitor apps for UX best practices',
            'Achieved +25.26% increase in registration page opens'
        ],

        // Key metrics cards
        keyMetrics: [
            { label: 'Survey Responses', value: '850', icon: '📋' },
            { label: 'Total Crowd Reached', value: '985,755', icon: '👥' },
            { label: 'Margin of Error', value: '3%', icon: '📊' },
            { label: 'Competitors Analyzed', value: '5 apps', icon: '🔍' }
        ],

        // Funnel chart
        funnelChart: {
            title: 'User Journey Funnel Analysis',
            stages: [
                { name: 'Reksa Dana Homepage Open', value: 100, users: '2.2M', color: '#6366f1' },
                { name: 'Registration Page Open', value: 25.24, users: '571.4K', color: '#8b5cf6' },
                { name: 'Registration Page Submit', value: 11.1, users: '212.3K', color: '#a855f7' }
            ]
        },

        situation: `<p>In July 2024, <strong>Reksa Dana</strong> (Mutual Funds) feature was opened to <strong>100% of DANA users</strong>. This served as a critical entry point for first-time investors within the DANA ecosystem.</p>
        <p style="margin-top: 12px;">However, Mixpanel analytics revealed concerning patterns:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Significant drop-off occurring between <strong>homepage</strong> and <strong>registration page</strong></li>
            <li>Users were immediately presented with mutual fund types without understanding basics</li>
            <li>No clear differentiation of benefits compared to familiar investments (deposits, gold)</li>
        </ul>`,

        task: `<p>As the <strong>Product Data Analyst</strong>, my objectives were to:</p>
        <ol style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Identify key barriers</strong> — understand reasons preventing users from completing registration</li>
            <li><strong>Analyze user behavior</strong> — gain deeper understanding of investment behavior patterns</li>
            <li><strong>Benchmark competitors</strong> — identify best practices from other investment apps</li>
            <li><strong>Validate redesign impact</strong> — measure conversion improvement through A/B testing</li>
        </ol>`,

        // Survey methodology
        codeSnippet: {
            title: 'Survey Distribution & Sampling',
            language: 'yaml',
            code: `# Survey Configuration
distribution_method: Push Notification
target_segment: Users who dropped off from Reksa Dana homepage

sampling:
  total_crowd: 985,755 users
  total_responses: 850
  margin_of_error: 3%
  confidence_level: 95%

segmentation:
  criteria: "Users Drop-off From Homepage"
  filter: opened_homepage = true AND registration_started = false`
        },

        dataProcessing: [
            '<strong>Funnel Data Extraction:</strong> Pulled user journey data from Mixpanel covering Reksa Dana homepage views, registration page opens, and form submissions',
            '<strong>Survey Design & Distribution:</strong> Designed online survey distributed via push notification to 985,755 users who dropped off from homepage. Achieved 850 responses with 3% margin of error',
            '<strong>Response Coding:</strong> Categorized open-ended responses into themes: familiarity with mutual funds, benefit understanding, investment preferences',
            '<strong>Competitor Benchmarking:</strong> Analyzed 5 competitor apps (Touch\'n Go, GoInvestasi, Paytm, Bibit, Fidelity) for onboarding UX patterns',
            '<strong>A/B Test Setup:</strong> Configured 80/20 traffic split with primary metric as registration page submit rate'
        ],

        // Research findings
        researchFindings: {
            title: 'Survey Research Findings (n=850)',
            mainStat: '61.2%',
            mainLabel: 'Unfamiliar with Mutual Funds',
            findings: [
                { percentage: '56.2%', label: 'Need basic explanation of mutual funds' },
                { percentage: '28.6%', label: 'Need benefits of each fund type' },
                { percentage: '71%', label: 'Prefer time deposits over mutual funds' }
            ],
            quotes: [
                '"I don\'t understand the difference between Bonds and Money Market"',
                '"Is this safe? I\'m afraid of losing my money"',
                '"Why should I use this? Regular savings is better"'
            ]
        },

        actions: [
            '<strong>Funnel Deep-Dive Analysis:</strong> Built Mixpanel dashboard tracking homepage-to-registration conversion. Identified that users were overwhelmed by fund type selection (Obligasi, Pasar Uang) without first understanding mutual fund basics',
            '<strong>Online Survey Research:</strong> Distributed survey to <strong>985,755 users</strong> who dropped off from homepage. Collected <strong>850 responses</strong> with 3% margin of error to understand pain points',
            '<strong>Quantitative Research Synthesis:</strong> Found that <strong>61.2% of users were unfamiliar with mutual funds</strong>. Users preferred time deposits because they perceived mutual funds as risky or unclear',
            '<strong>Competitor Benchmarking:</strong> Analyzed 5 investment apps (Touch\'n Go, GoInvestasi, Paytm, Bibit, Fidelity). Found best practice: highlight benefits on homepage with emphasis on <strong>seamless</strong>, <strong>secure</strong>, and <strong>easy</strong> messaging',
            '<strong>UX Recommendations:</strong> Proposed highlighting Reksa Dana benefits (returns, safety, OJK regulation) prominently on onboarding page. Ensure essential mutual fund education is featured before fund type selection',
            '<strong>A/B Experiment Execution:</strong> Collaborated with UXD to design new onboarding emphasizing "Investasi mudah, mulai Rp10Rb aja!" with benefit-focused messaging. Deployed 80/20 traffic split'
        ],

        // A/B test results
        abTestResults: {
            title: 'A/B Test Results (Pre–Post Analysis)',
            control: { name: 'Control (80%)', conversion: 10.97 },
            treatment: { name: 'New Onboarding (20%)', conversion: 11.1 },
            lift: '+25.26%',
            pValue: 'p < 0.05',
            stages: [
                { name: 'Homepage → Reg Page', control: 23.81, treatment: 25.24, lift: '+6.0%' },
                { name: 'Reg Page → Submit', control: 46.08, treatment: 43.97, lift: '-4.6%' },
                { name: 'Overall Conversion', control: 10.97, treatment: 11.1, lift: '+1.2%' }
            ]
        },

        resultHighlight: '+25.26% increase in registration page open rate',
        resultDescription: `<p>The new Reksa Dana onboarding showed <strong>real improvements</strong> in user engagement:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Registration Page Open:</strong> 23.81% → 25.24% (+6% lift)</li>
            <li><strong>User comprehension:</strong> Benefit-focused messaging reduced confusion</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Key Insights:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Emphasizing user benefits works better than technical fund information</li>
            <li>Straightforward information improves user confidence</li>
            <li>Educational content before fund selection reduces drop-off</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Business Impact:</strong> Insights were used to guide product strategy and prioritize educational features. Research report received <strong>praise from FS team</strong> for thorough details, benchmarks, and clear presentation. Adopted as template for future research.</p>`
    },
    'asset-valuation': {
        icon: '🏢',
        title: 'Public Asset Valuation & Rental Analysis',
        tags: ['Public Sector', 'Power BI', 'Excel', 'Data Cleaning', 'Dashboard'],

        // Role clarification
        role: 'Business Intelligence Analyst (data consolidation, dashboard development)',

        // TL;DR for quick scanning
        tldr: [
            'Consolidated 50,000+ asset records across 6 categories',
            'Built 6+ Power BI dashboards for regional analysis',
            'Reduced manual reporting effort by ~80%'
        ],

        // Key metrics cards
        keyMetrics: [
            { label: 'Total Asset Records', value: '50,000+', icon: '📊' },
            { label: 'Asset Categories', value: '6 types', icon: '🏗️' },
            { label: 'Total Asset Value', value: 'Rp 28T+', icon: '💰' },
            { label: 'Dashboards Built', value: '6+', icon: '📈' }
        ],

        situation: `<p>The public asset valuation and rental process at <strong>DJKN (Direktorat Jenderal Kekayaan Negara)</strong> involved large, fragmented Excel datasets across <strong>6 asset categories</strong>:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Tanah (Land)</strong> — 34,319 records</li>
            <li><strong>Sewa ATM</strong> — 15,198 records</li>
            <li><strong>Gedung (Buildings)</strong> — scattered records</li>
            <li><strong>Tower & BTS</strong> — telecom infrastructure</li>
            <li><strong>Ruang Komersial</strong> — commercial spaces</li>
            <li><strong>Tanah Sewa</strong> — rental land</li>
        </ul>
        <p style="margin-top: 12px;">Data was inconsistent, difficult to analyze, and relied heavily on manual Excel reporting with no centralized visibility.</p>`,

        task: `<p>As the <strong>Data Analyst</strong> for asset valuation, my objectives were to:</p>
        <ol style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Consolidate fragmented data</strong> — merge multi-sheet Excel files into unified datasets</li>
            <li><strong>Standardize formats</strong> — normalize inconsistent data entries and handle missing values</li>
            <li><strong>Create derived metrics</strong> — calculate price/m², gap %, contract duration, NJOP comparison</li>
            <li><strong>Build interactive dashboards</strong> — enable regional and temporal analysis for stakeholders</li>
        </ol>`,

        // Code snippet for data processing
        codeSnippet: {
            title: 'Data Transformation Logic (Power Query)',
            language: 'python',
            code: `# Key derived metrics calculation
df['harga_per_m2'] = df['total_harga_sewa'] / df['luas_m2']
df['gap_harga_pct'] = ((df['harga_sewa'] - df['njop']) / df['njop']) * 100
df['selisih_harga'] = df['harga_sewa'] - df['njop']

# Categorization
df['kategori_lokasi'] = df['lokasi'].apply(
    lambda x: 'Pusat Kota' if x in CBD_LIST 
    else 'Sub Urban' if x in SUBURBAN_LIST 
    else 'Desa'
)

# Aggregation by region
summary = df.groupby(['provinsi', 'kabupaten']).agg({
    'total_harga_sewa': 'sum',
    'gap_harga_pct': 'mean',
    'jumlah_aset': 'count'
}).reset_index()`
        },

        dataProcessing: [
            '<strong>Data Extraction:</strong> Collected multi-sheet Excel files from 6 asset categories across all provinces. Each category had different column structures and naming conventions',
            '<strong>Data Cleaning:</strong> Standardized column names, handled missing values (especially in location data), removed duplicates, and validated data types',
            '<strong>Feature Engineering:</strong> Created derived metrics: <code>harga_per_m2</code>, <code>gap_harga_pct</code>, <code>selisih_harga</code>, <code>kategori_lokasi</code>, <code>jangka_waktu_sewa</code>',
            '<strong>Geographic Enrichment:</strong> Mapped assets to provinces, kabupaten, and kelurahan for regional analysis',
            '<strong>Dashboard Development:</strong> Built 6+ interactive Power BI dashboards with drill-down filters by province, kabupaten, and time period'
        ],

        // Dashboard showcase - showing 2 of 6+ (with real screenshots)
        dashboardShowcase: {
            title: 'Dashboard Samples (2 of 6+ dashboards)',
            note: 'Showing 2 representative dashboards. Full suite includes Gedung, Tower, Ruang Komersial, and Tanah Sewa dashboards.',
            images: [
                { name: 'Tabulasi Tanah', src: 'images/tabulasi_tanah.png' },
                { name: 'Tabulasi Sewa ATM', src: 'images/tabulasi_atm.png' }
            ]
        },

        actions: [
            '<strong>Multi-Source Data Integration:</strong> Consolidated Excel files from 6 different asset categories, each with unique schemas. Merged into unified data model with consistent structure',
            '<strong>Data Quality Assurance:</strong> Identified and handled ~15% missing values in location fields. Validated numeric data ranges and flagged outliers for review',
            '<strong>Metric Engineering:</strong> Created key performance metrics: price per m², price gap percentage (vs NJOP), rental duration analysis, and regional benchmarks',
            '<strong>Geographic Analysis:</strong> Built distribution analysis by kategori lokasi (Pusat Kota, Sub Urban, Desa) and administrative regions',
            '<strong>Interactive Dashboard Suite:</strong> Developed <strong>6+ Power BI dashboards</strong> with map visualizations, trend charts, and comparison tables. Implemented drill-down filters for province, kabupaten, and kelurahan',
            '<strong>Stakeholder Reporting:</strong> Enabled self-service analytics for regional offices to monitor asset performance without manual Excel processing'
        ],

        resultHighlight: '50,000+ asset records analyzed across 6 categories',
        resultDescription: `<p>Successfully delivered comprehensive asset analytics platform:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Pricing Gap Identified:</strong> Discovered up to <strong>30.19% gap</strong> between rental prices and NJOP (Nilai Jual Objek Pajak) in land assets</li>
            <li><strong>Regional Insights:</strong> Mapped asset distribution across all provinces with concentration analysis</li>
            <li><strong>ATM Analysis:</strong> Identified bank-specific rental patterns (Bank Negara Indonesia leading with Rp 0.69T)</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Business Impact:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Insights were used to inform rental price policy decisions</li>
            <li>Reduced manual reporting effort by <strong>~80%</strong></li>
            <li>Enabled data-driven rental price negotiations</li>
            <li>Provided visibility into nationwide asset portfolio for the first time</li>
        </ul>`
    },
    'sla-monitoring': {
        icon: '⏱️',
        title: 'Operational SLA & Performance Monitoring',
        tags: ['Public Sector', 'Tableau', 'SQL', 'Dashboard', 'Performance Analytics'],

        // Role clarification
        role: 'Technical Data Analyst (SQL, data cleaning, Tableau dashboards)',

        // TL;DR for quick scanning
        tldr: [
            'Analyzed 10,000+ service records for SLA compliance',
            'Detected 338 anomalies and 81 duplicate entries',
            'Enabled proactive SLA monitoring via Tableau dashboards'
        ],

        // Key metrics cards
        keyMetrics: [
            { label: 'Total Reports', value: '10,095', icon: '📋' },
            { label: 'Total Requests', value: '6,439', icon: '📝' },
            { label: 'Average Index', value: '100.10', icon: '📊' },
            { label: 'Dashboards Built', value: '2', icon: '📈' }
        ],

        situation: `<p>The monitoring of <strong>Norma Waktu SOP</strong> (Service Level Agreement / SLA) at DJKN required consistent visibility into service timeliness across organizational units and service types.</p>
        <p style="margin-top: 12px;">Key challenges identified:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Raw operational data stored in transactional databases with <strong>inconsistent formats</strong></li>
            <li>Missing timestamps and duplicate entries in source data</li>
            <li>No centralized view of SLA performance across 5 service categories (KEP-29)</li>
            <li>Manual Excel-based reporting consuming significant analyst time</li>
        </ul>`,

        task: `<p>As the <strong>Technical Data Analyst</strong>, my objectives were to:</p>
        <ol style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Extract operational data</strong> — query transactional databases for request-level data</li>
            <li><strong>Clean and transform</strong> — handle missing values, normalize categories, remove duplicates</li>
            <li><strong>Engineer metrics</strong> — calculate processing duration, SLA compliance index, anomaly detection</li>
            <li><strong>Build dashboards</strong> — create interactive Tableau dashboards for monitoring</li>
        </ol>`,

        // SQL code snippet
        codeSnippet: {
            title: 'SLA Compliance Query (SQL)',
            language: 'sql',
            code: `-- Calculate SLA compliance by service category
SELECT 
    jenis_tujuan_kep29,
    COUNT(*) as jumlah_laporan,
    AVG(hari_kerja) as rata_rata_hari_kerja,
    SUM(CASE WHEN keterangan = 'Sangat Tepat Waktu' THEN 1 ELSE 0 END) as sangat_tepat,
    SUM(CASE WHEN keterangan = 'Tepat Waktu' THEN 1 ELSE 0 END) as tepat_waktu,
    SUM(CASE WHEN keterangan = 'Tidak Tepat Waktu' THEN 1 ELSE 0 END) as tidak_tepat
FROM laporan_sla
WHERE tahun = 2025
GROUP BY jenis_tujuan_kep29
ORDER BY jumlah_laporan DESC;`
        },

        dataProcessing: [
            '<strong>Data Extraction:</strong> Queried SIP (Sistem Informasi Penilaian) database to extract request-level data including nomor laporan, tanggal permohonan, tanggal penyelesaian, and jenis tujuan KEP-29',
            '<strong>Data Cleaning:</strong> Identified and flagged 81 duplicate entries (Nomor Laporan Duplikat). Handled missing timestamps and normalized service categories',
            '<strong>Anomaly Detection:</strong> Flagged 338 records with anomalous processing times (<1 day or >100 days) for review',
            '<strong>SLA Classification:</strong> Categorized reports into: Sangat Tepat Waktu (62.66%), Tepat Waktu (1.18%), Tidak Tepat Waktu (3.62%), Tidak Termasuk Perhitungan IKU (32.67%)',
            '<strong>Dashboard Development:</strong> Built 2 Tableau dashboards: SIP Reengineering monitoring (monthly trends) and Norma Waktu SOP Penilaian (detailed breakdown)'
        ],

        actions: [
            '<strong>Database Query Optimization:</strong> Wrote SQL queries to extract 10,095 report records and 6,439 request records from SIP database. Joined multiple tables to get complete service timeline',
            '<strong>Duplicate Detection:</strong> Identified <strong>81 duplicate entries</strong> (Nomor Laporan Duplikat) requiring data validation. Flagged records with "1" in Duplikat column',
            '<strong>Anomaly Analysis:</strong> Detected <strong>338 anomalous records</strong> with processing times outside normal range. These were excluded from SLA calculations',
            '<strong>Monthly Trend Analysis:</strong> Built time-series visualization showing workload patterns. Identified peak months: January (1,094), July (1,116), and August (957 reports)',
            '<strong>Service Category Breakdown:</strong> Analyzed 5 KEP-29 service types. Found Non BMN has highest avg processing time (216 days) while Pemanfaatan (sewa) BMN averages 73 days',
            '<strong>Interactive Dashboard Suite:</strong> Developed 2 Tableau dashboards with drill-down filters by Triwulan, UE II, Unit, and Keterangan. Enabled self-service monitoring for stakeholders'
        ],

        // Dashboard showcase with real screenshots
        dashboardShowcase: {
            title: 'Dashboard Samples (2 of 2 dashboards)',
            note: 'Interactive Tableau dashboards for SLA monitoring with drill-down capabilities.',
            images: [
                { name: 'Monitoring SIP Reengineering Tahun 2025', src: 'images/sla_reengineering.png' },
                { name: 'Monitoring Norma Waktu SOP Penilaian', src: 'images/sla_penilaian.png' }
            ]
        },

        resultHighlight: '10,095 laporan & 6,439 permohonan analyzed',
        resultDescription: `<p>Successfully delivered comprehensive SLA monitoring platform:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Compliance Rate:</strong> Achieved visibility into 62.66% "Sangat Tepat Waktu" rate with 100.10 average index</li>
            <li><strong>Anomaly Detection:</strong> Flagged 338 records with unusual processing times and 81 duplicates</li>
            <li><strong>Monthly Insights:</strong> Revealed workload spikes in Jan/Jul correlated with deadline periods</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Business Impact:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>Insights were used to optimize resource allocation during peak periods</li>
            <li>Reduced manual reporting effort significantly</li>
            <li>Enabled proactive SLA monitoring instead of reactive reporting</li>
            <li>Provided leadership with real-time visibility into service performance</li>
        </ul>`
    },
    'titanic-eda': {
        icon: '🔍',
        title: 'Exploratory Data Analysis on Passenger Survival Data',
        tags: ['Python', 'Pandas', 'Seaborn', 'Statistical Analysis', 'Data Cleaning'],

        // Role clarification
        role: 'Data Analyst (data preprocessing, statistical analysis)',

        // TL;DR for quick scanning
        tldr: [
            'Cleaned 1,300+ passenger records with 0 missing values',
            'Identified passenger class as strongest survival predictor (χ² = 81.6)',
            'Prepared ML-ready dataset with statistical validation'
        ],

        // Key metrics cards
        keyMetrics: [
            { label: 'Total Passengers', value: '1,309', icon: '👥' },
            { label: 'Survival Rate', value: '44.1%', icon: '📊' },
            { label: 'Features Cleaned', value: '14 → 9', icon: '🧹' },
            { label: 'Outliers Detected', value: '171', icon: '⚠️' }
        ],

        // Survival funnel chart
        funnelChart: {
            title: 'Survival Distribution by Passenger Class',
            stages: [
                { name: 'Class 1 (Upper)', value: 100, users: '200 survived', color: '#6366f1' },
                { name: 'Class 2 (Middle)', value: 59.5, users: '119 survived', color: '#8b5cf6' },
                { name: 'Class 3 (Lower)', value: 39, users: '78 survived', color: '#a855f7' }
            ]
        },

        situation: `<p>This was a hands-on data preprocessing project from the <strong>ToT Microcredential AI-Data Science Dirjen Dikti</strong> program. The goal was simple: take the classic Titanic dataset and really understand what it takes to prepare messy real-world data for machine learning.</p>
        <p style="margin-top: 12px;">The dataset had typical real-world problems:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Missing values everywhere</strong> — age, cabin, embarked, and more</li>
            <li><strong>Duplicates lurking</strong> — 100 duplicate rows hiding in the data</li>
            <li><strong>Outliers causing trouble</strong> — especially in fare and family size</li>
            <li><strong>Mixed data types</strong> — categorical features that needed encoding</li>
        </ul>
        
        <div class="code-block" style="margin-top: 16px;">
            <div class="code-header"><span class="code-lang">PYTHON</span> Import Libraries</div>
            <pre><code>import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.stats as scp

from sklearn.preprocessing import LabelEncoder, Normalizer, StandardScaler

# Load data
titanic1 = pd.read_csv('data_titanic1.csv')
print("data: ", titanic1.shape)  # Output: (900, 14)</code></pre>
        </div>`,

        task: `<p>My job was to go through the <strong>full preprocessing pipeline</strong>:</p>
        <ol style="margin-top: 8px; margin-left: 20px;">
            <li><strong>Explore the data</strong> — understand distributions, spot patterns, find problems</li>
            <li><strong>Clean things up</strong> — handle missing values, remove duplicates, fix outliers</li>
            <li><strong>Run statistical tests</strong> — figure out which features actually matter for survival</li>
            <li><strong>Prepare for ML</strong> — encode categories, normalize values, split features</li>
        </ol>
        
        <div class="code-block" style="margin-top: 16px;">
            <div class="code-header"><span class="code-lang">PYTHON</span> Check Missing Values</div>
            <pre><code># Custom function to check null values
def cek_null(df):
    col_na = df.isnull().sum().sort_values(ascending=False)
    percent = col_na / len(df)
    missing_data = pd.concat([col_na, percent], axis=1, keys=['Total', 'Percent'])
    print(missing_data[missing_data['Total'] > 0])

cek_null(merged_titanic)
# Output:
# body        1188  0.907563
# cabin       1014  0.774637
# boat         823  0.628724
# home.dest    564  0.430863
# age          263  0.200917</code></pre>
        </div>`,

        // Code snippet for outlier detection
        codeSnippet: {
            title: 'Outlier Detection using IQR Method',
            language: 'python',
            code: `# Sorting and calculating quartiles
sorted_data = merged_titanic.sort_values(by=['fare'])
Q1 = sorted_data.fare.quantile(0.25)
Q3 = sorted_data.fare.quantile(0.75)

# IQR method for outlier detection
IQR = Q3 - Q1
lower_limit = Q1 - 1.5*IQR
upper_limit = Q3 + 1.5*IQR

# Detect outliers
def detect_outliers(data):
    outliers = []
    for i in sorted_data.fare:
        if i < lower_limit or i > upper_limit:
            outliers.append(i)
    return outliers

fare_outliers = detect_outliers(sorted_data.fare)
print(len(fare_outliers))  # Output: 171 outliers

# Remove outliers
removal_outlier = sorted_data.loc[
    (sorted_data.fare > lower_limit) & 
    (sorted_data.fare < upper_limit)
]`
        },

        dataProcessing: [
            `<strong>Step 1: Merge & Check Duplicates</strong>
            <p style="margin: 8px 0; color: #94a3b8;">Merge two datasets and check for duplicate rows.</p>
            <div class="code-block" style="margin-top: 8px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Merge two dataframes
frames = [titanic1, titanic2]
merged_titanic = pd.concat(frames).reset_index(drop=True)

# Check duplicates
merged_titanic.duplicated(keep=False).sum()</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">100</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">→ Found 100 duplicate rows! Need to drop these to avoid bias.</p>
            </div>
            <div class="code-block" style="margin-top: 12px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Drop duplicates
merged_titanic = merged_titanic.drop_duplicates()
merged_titanic.duplicated(keep=False).sum()</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">0</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">✓ All duplicates removed!</p>
            </div>`,

            `<strong>Step 2: Handle Missing Values</strong>
            <p style="margin: 8px 0; color: #94a3b8;">Fill missing values with appropriate strategy for each column.</p>
            <div class="code-block" style="margin-top: 8px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Fill age with median
col = ["age"]
for c in col:
    median = titanic_cleaned[~titanic_cleaned.isna()].median()[0]
    titanic_cleaned[c] = titanic_cleaned[c].fillna(median)

# Fill embarked with mode 'C'
titanic_cleaned["embarked"] = titanic_cleaned["embarked"].fillna('C')

# Fill boat with 'None'
titanic_cleaned['boat'] = titanic_cleaned['boat'].fillna('None')</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">RESULT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">age      → filled with median (31.0)
embarked → filled with 'C' (Cherbourg port)
boat     → filled with 'None' (no lifeboat)</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">→ Using median for age because it's robust to outliers.</p>
            </div>
            <div class="code-block" style="margin-top: 12px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Drop columns with >70% missing
titanic_cleaned = merged_titanic.drop(
    ['name', 'ticket', 'body', 'cabin', 'home.dest'], axis=1
)
titanic_cleaned.shape</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">(1308, 9)</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">→ Reduced from 14 to 9 columns. Dropped columns with >70% missing or non-predictive.</p>
            </div>`,

            `<strong>Step 3: Statistical Testing (Chi-Square)</strong>
            <p style="margin: 8px 0; color: #94a3b8;">Test if there's a significant relationship between passenger class and survival.</p>
            <div class="code-block" style="margin-top: 8px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Chi-square test function
def compute_freq_chi2(x, y):
    freqtab = pd.crosstab(x, y)
    print("Frequency table")
    print(freqtab)
    chi2, pval, dof, expected = scp.chi2_contingency(freqtab)
    print("ChiSquare test statistic: ", chi2)
    print("p-value: ", pval)

# Test: survived vs pclass
compute_freq_chi2(titanic1.survived, titanic1.pclass)</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #f59e0b; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #f59e0b; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">Frequency table
pclass       1    2    3
survived                 
0          123  158  222
1          200  119   78

ChiSquare test statistic: 81.61469423204498
p-value: 1.894935039255057e-18</pre>
                <p style="color: #f59e0b; margin-top: 8px; font-size: 13px;">🔥 p-value < 0.001 = SUPER SIGNIFICANT! Passenger class strongly affects survival rate. First class had highest survival (200 survived vs 123 didn't).</p>
            </div>`,

            `<strong>Step 4: Label Encoding for Categorical Features</strong>
            <p style="margin: 8px 0; color: #94a3b8;">Convert categorical data (text) to numeric for ML algorithms.</p>
            <div class="code-block" style="margin-top: 8px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code># Encode categorical columns to numeric
col = titanic_cleaned.select_dtypes(include=["object"]).columns

for c in col:
    if len(titanic_cleaned[c].value_counts()) <= 28:
        le = LabelEncoder()
        le.fit(list(titanic_cleaned[c].values))
        titanic_cleaned[c] = le.transform(list(titanic_cleaned[c].values))

titanic_cleaned.head()</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">   pclass  survived  sex    age  sibsp  parch     fare  embarked  boat
0       1         1    0  29.00      0      0  211.337         2    11
1       1         1    1   0.92      1      2  151.550         2     2
2       1         0    0   2.00      1      2  151.550         2    27
3       1         0    1  30.00      1      2  151.550         2    27</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">→ sex: female=0, male=1 | embarked: C=0, Q=1, S=2 | boat: encoded by number</p>
            </div>`,

            `<strong>Step 5: Normalization with MinMaxScaler</strong>
            <p style="margin: 8px 0; color: #94a3b8;">Scale all features to 0-1 range so no single feature dominates.</p>
            <div class="code-block" style="margin-top: 8px;">
                <div class="code-header"><span class="code-lang">PYTHON</span></div>
                <pre><code>from sklearn.preprocessing import MinMaxScaler

# Separate target and predictors
X = titanic_cleaned.drop('survived', axis=1)
Y = titanic_cleaned['survived']

# Apply MinMax scaling
scaler = MinMaxScaler()
scaled = scaler.fit_transform(X)
X = pd.DataFrame(scaled)

X.describe()</code></pre>
            </div>
            <div class="code-output" style="background: #1e293b; border-left: 3px solid #22c55e; padding: 12px; margin-top: 8px; border-radius: 4px;">
                <span style="color: #22c55e; font-weight: 600;">OUTPUT:</span>
                <pre style="margin: 8px 0 0 0; color: #e2e8f0;">              0         1         2         3    ...
count  1308.00  1308.00  1308.00  1308.00  ...
mean      0.65     0.64     0.30     0.06  ...
std       0.42     0.48     0.21     0.10  ...
min       0.00     0.00     0.00     0.00  ...
max       1.00     1.00     1.00     1.00  ...</pre>
                <p style="color: #94a3b8; margin-top: 8px; font-size: 13px;">✓ All features now in 0-1 range. Data is ready for ML model training!</p>
            </div>`
        ],

        // Research findings - Chi-square test results
        researchFindings: {
            title: 'Chi-Square Test Results',
            mainStat: 'p < 0.001',
            mainLabel: 'Class strongly predicts survival',
            findings: [
                { percentage: '81.6', label: 'Chi² statistic (class vs survival)' },
                { percentage: '28.1', label: 'Chi² statistic (embarked vs survival)' },
                { percentage: '-0.30', label: 'Pearson correlation (class vs survival)' }
            ]
        },

        actions: [
            '<strong>Exploratory Data Analysis:</strong> Created count plots for categorical variables (pclass, sex, survived, embarked). Found that Class 3 had the most passengers but lowest survival rate — the "women and children first" policy was very real',
            '<strong>Statistical Testing:</strong> Ran Chi-square tests to check relationships. <strong>Pclass vs survival: χ² = 81.6, p < 0.001</strong> — super significant! Also found that Southampton (S) embarkation port had the most casualties',
            '<strong>Correlation Analysis:</strong> Built Pearson correlation matrix for numeric features. <strong>Fare positively correlated with survival (0.25)</strong> — money did help your chances on the Titanic',
            '<strong>Boxplot Visualization:</strong> Created boxplots to visualize outliers across all numeric features. Fare had the most extreme outliers — some passengers paid 500+ while median was around 24',
            '<strong>Final Dataset:</strong> Cleaned data reduced from 1,309 to <strong>1,308 rows</strong> and from 14 to <strong>9 features</strong>. All columns non-null and ready for model training'
        ],

        // Preprocessing pipeline visualization
        abTestResults: {
            title: 'Data Quality Before vs After Cleaning',
            control: { name: 'Before Cleaning', conversion: 14 },
            treatment: { name: 'After Cleaning', conversion: 9 },
            lift: '-36%',
            pValue: 'features reduced',
            stages: [
                { name: 'Total Records', control: 1309, treatment: 1308, lift: '-1 row' },
                { name: 'Features', control: 14, treatment: 9, lift: '-5 cols' },
                { name: 'Missing Values', control: 3541, treatment: 0, lift: '-100%' },
                { name: 'Duplicates', control: 100, treatment: 0, lift: '-100%' }
            ]
        },

        resultHighlight: 'Clean dataset ready for ML with 0 missing values',
        resultDescription: `<p>Successfully transformed messy Titanic data into ML-ready format:</p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li><strong>All missing values handled:</strong> Strategic imputation using median/mode for meaningful features</li>
            <li><strong>Outliers documented:</strong> 171 fare outliers identified with clear documentation for future handling</li>
            <li><strong>Statistical insights gained:</strong> Passenger class is the strongest predictor (χ² = 81.6)</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Key Takeaways:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px;">
            <li>First-class passengers had significantly higher survival rates</li>
            <li>Fare amount correlates with survival — wealth literally saved lives</li>
            <li>Southampton port had the most casualties (but also most passengers)</li>
            <li>Proper preprocessing is 80% of the work in any ML project</li>
        </ul>
        <p style="margin-top: 12px;"><strong>Tools Used:</strong> Python, Pandas, NumPy, Matplotlib, Seaborn, Scipy, Scikit-learn (LabelEncoder, MinMaxScaler)</p>
        
        <div class="code-block" style="margin-top: 16px;">
            <div class="code-header"><span class="code-lang">PYTHON</span> Final Dataset Info</div>
            <pre><code>titanic_cleaned.info()
# <class 'pandas.core.frame.DataFrame'>
# Int64Index: 1308 entries, 0 to 1308
# Data columns (total 9 columns):
#  0   pclass     1308 non-null  int64
#  1   survived   1308 non-null  int64
#  2   sex        1308 non-null  int64
#  3   age        1308 non-null  float64
#  4   sibsp      1308 non-null  int64
#  5   parch      1308 non-null  int64
#  6   fare       1308 non-null  float64
#  7   embarked   1308 non-null  int64
#  8   boat       1308 non-null  int64
# memory usage: 102.2 KB ✓</code></pre>
        </div>`
    }
};

function initializeProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = modal.querySelector('.modal-close');

    // Add click handlers to project cards
    document.querySelectorAll('.project-card-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const projectId = this.getAttribute('href').replace('#', '');
            const project = projectData[projectId];

            if (project) {
                openModal(project);
            }
        });
    });

    // Close modal handlers
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

    const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const actionsHtml = project.actions.map(action => `<li>${action}</li>`).join('');

    // TL;DR section (if available)
    let tldrHtml = '';
    if (project.tldr && project.tldr.length > 0) {
        const tldrItems = project.tldr.map(item => `<li>${item}</li>`).join('');
        tldrHtml = `
        <div class="modal-section tldr-section">
            <h4>⚡ TL;DR</h4>
            <ul class="tldr-list">${tldrItems}</ul>
        </div>`;
    }

    // Role section (if available)
    let roleHtml = '';
    if (project.role) {
        roleHtml = `<p class="modal-role"><strong>My Role:</strong> ${project.role}</p>`;
    }

    // Key Metrics Cards (if available)
    let keyMetricsHtml = '';
    if (project.keyMetrics && project.keyMetrics.length > 0) {
        const metricsItems = project.keyMetrics.map(m => `
            <div class="metric-card">
                <div class="metric-icon">${m.icon}</div>
                <div class="metric-value">${m.value}</div>
                <div class="metric-label">${m.label}</div>
            </div>
        `).join('');
        keyMetricsHtml = `<div class="metrics-grid">${metricsItems}</div>`;
    }

    // Funnel Chart (if available)
    let funnelChartHtml = '';
    if (project.funnelChart) {
        const stages = project.funnelChart.stages;
        const bars = stages.map((s, i) => {
            const barWidth = Math.max(s.value * 2.5, 15);
            return `
                <div class="funnel-stage">
                    <div class="funnel-label">${s.name}</div>
                    <div class="funnel-bar-container">
                        <div class="funnel-bar" style="width: ${barWidth}%; background: ${s.color};">
                            <span class="funnel-value">${s.value}%</span>
                        </div>
                    </div>
                    <div class="funnel-users">${s.users} users</div>
                </div>
            `;
        }).join('');
        funnelChartHtml = `
        <div class="modal-section visual-section">
            <h4>📊 ${project.funnelChart.title}</h4>
            <div class="funnel-chart">${bars}</div>
        </div>`;
    }

    // Code Snippet (if available)
    let codeSnippetHtml = '';
    if (project.codeSnippet) {
        codeSnippetHtml = `
        <div class="modal-section visual-section">
            <h4>💻 ${project.codeSnippet.title}</h4>
            <div class="code-block">
                <div class="code-header">
                    <span class="code-lang">${project.codeSnippet.language.toUpperCase()}</span>
                </div>
                <pre><code>${project.codeSnippet.code}</code></pre>
            </div>
        </div>`;
    }

    // Data Processing section
    let dataProcessingHtml = '';
    if (project.dataProcessing && project.dataProcessing.length > 0) {
        const dataProcessingItems = project.dataProcessing.map(item => `<li>${item}</li>`).join('');
        dataProcessingHtml = `
        <div class="modal-section">
            <h4>🛠️ Data Processing</h4>
            <ul>${dataProcessingItems}</ul>
        </div>`;
    }

    // Research Findings (if available)
    let researchFindingsHtml = '';
    if (project.researchFindings) {
        const rf = project.researchFindings;
        const findingsItems = rf.findings.map(f => `
            <div class="finding-item">
                <span class="finding-percent">${f.percentage}</span>
                <span class="finding-label">${f.label}</span>
            </div>
        `).join('');
        const quotesItems = rf.quotes ? rf.quotes.map(q => `<div class="user-quote">${q}</div>`).join('') : '';
        const quotesSection = quotesItems ? `
                <div class="user-quotes">
                    <div class="quotes-title">User Quotes:</div>
                    ${quotesItems}
                </div>` : '';
        researchFindingsHtml = `
        <div class="modal-section visual-section">
            <h4>🔬 ${rf.title}</h4>
            <div class="research-findings">
                <div class="main-finding">
                    <div class="main-stat">${rf.mainStat}</div>
                    <div class="main-label">${rf.mainLabel}</div>
                </div>
                <div class="findings-breakdown">${findingsItems}</div>
                ${quotesSection}
            </div>
        </div>`;
    }

    // A/B Test Results (if available)
    let abTestHtml = '';
    if (project.abTestResults) {
        const ab = project.abTestResults;
        const stageRows = ab.stages.map(s => `
            <tr>
                <td>${s.name}</td>
                <td>${s.control}%</td>
                <td>${s.treatment}%</td>
                <td class="lift-positive">${s.lift}</td>
            </tr>
        `).join('');
        abTestHtml = `
        <div class="modal-section visual-section">
            <h4>🧪 ${ab.title}</h4>
            <div class="ab-test-visual">
                <div class="ab-comparison">
                    <div class="ab-variant control">
                        <div class="variant-label">${ab.control.name}</div>
                        <div class="variant-value">${ab.control.conversion}%</div>
                    </div>
                    <div class="ab-arrow">→</div>
                    <div class="ab-variant treatment">
                        <div class="variant-label">${ab.treatment.name}</div>
                        <div class="variant-value">${ab.treatment.conversion}%</div>
                    </div>
                    <div class="ab-lift">
                        <div class="lift-value">${ab.lift}</div>
                        <div class="lift-label">Lift (${ab.pValue})</div>
                    </div>
                </div>
                <table class="ab-table">
                    <thead>
                        <tr>
                            <th>Funnel Stage</th>
                            <th>Control</th>
                            <th>Treatment</th>
                            <th>Lift</th>
                        </tr>
                    </thead>
                    <tbody>${stageRows}</tbody>
                </table>
            </div>
        </div>`;
    }

    // Dashboard Showcase (if available)
    let dashboardShowcaseHtml = '';
    if (project.dashboardShowcase) {
        const ds = project.dashboardShowcase;
        let contentHtml = '';

        // Check if using images or metric cards
        if (ds.images && ds.images.length > 0) {
            const imagesHtml = ds.images.map(img => `
                <div class="dashboard-image-card">
                    <div class="dashboard-image-header">${img.name}</div>
                    <img src="${img.src}" alt="${img.name}" class="dashboard-screenshot" />
                </div>
            `).join('');
            contentHtml = `<div class="dashboard-images">${imagesHtml}</div>`;
        } else if (ds.dashboards && ds.dashboards.length > 0) {
            const dashboardCards = ds.dashboards.map(d => {
                const metricsHtml = d.metrics.map(m => `
                    <div class="dashboard-metric">
                        <span class="dashboard-metric-value">${m.value}</span>
                        <span class="dashboard-metric-label">${m.label}</span>
                    </div>
                `).join('');
                return `
                    <div class="dashboard-card">
                        <div class="dashboard-card-header">${d.name}</div>
                        <div class="dashboard-metrics">${metricsHtml}</div>
                    </div>
                `;
            }).join('');
            contentHtml = `<div class="dashboard-showcase">${dashboardCards}</div>`;
        }

        dashboardShowcaseHtml = `
        <div class="modal-section visual-section">
            <h4>📊 ${ds.title}</h4>
            <p class="dashboard-note">${ds.note}</p>
            ${contentHtml}
        </div>`;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">${project.icon}</div>
            <h3>${project.title}</h3>
            ${roleHtml}
            <div class="modal-tags">${tagsHtml}</div>
        </div>
        
        ${tldrHtml}
        
        ${keyMetricsHtml}
        
        <div class="modal-section">
            <h4>⭐ Situation</h4>
            <div class="section-content">${project.situation}</div>
        </div>
        
        ${funnelChartHtml}
        
        <div class="modal-section">
            <h4>🎯 Task</h4>
            <div class="section-content">${project.task}</div>
        </div>
        
        ${codeSnippetHtml}
        
        ${dataProcessingHtml}
        
        ${researchFindingsHtml}
        
        <div class="modal-section">
            <h4>🔍 Action</h4>
            <ul>${actionsHtml}</ul>
        </div>
        
        ${abTestHtml}
        
        ${dashboardShowcaseHtml}
        
        <div class="modal-section modal-result">
            <h4>📈 Result</h4>
            <div class="modal-result-highlight">${project.resultHighlight}</div>
            <div class="section-content">${project.resultDescription}</div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll for anchor links (except project links which open modals)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('project-card-link')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add subtle animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is ready
document.addEventListener('DOMContentLoaded', animateOnScroll);
