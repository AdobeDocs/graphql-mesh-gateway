"use strict";(self.webpackChunkgraphql_mesh_gateway=self.webpackChunkgraphql_mesh_gateway||[]).push([[4505],{80537:function(e,a,t){t.r(a),t.d(a,{_frontmatter:function(){return s},default:function(){return g}});var n=t(58168),o=t(80045),i=(t(88763),t(15680)),r=t(83407);const m=["components"],s={},l=(d="InlineAlert",function(e){return console.warn("Component "+d+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.mdx)("div",e)});var d;const p={_frontmatter:s},u=r.A;function g(e){let{components:a}=e,t=(0,o.A)(e,m);return(0,i.mdx)(u,(0,n.A)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"logging"},"Logging"),(0,i.mdx)("p",null,"API Mesh for Adobe Developer App Builder allows you to use logs to monitor and debug issues with your mesh and its sources. After ",(0,i.mdx)("a",{parentName:"p",href:"#display-recent-requests"},"getting a list")," of recent logs by rayID, you can ",(0,i.mdx)("a",{parentName:"p",href:"#display-a-single-log-by-rayid"},"look up a recent log"),". Alternatively, you can ",(0,i.mdx)("a",{parentName:"p",href:"#export-bulk-logs"},"export logs in bulk")," for a specific time range."),(0,i.mdx)(l,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"Only ",(0,i.mdx)("a",{parentName:"p",href:"../basic/create-mesh.md#access-your-mesh-urls"},"edge meshes")," support logging."),(0,i.mdx)("h2",{id:"display-recent-requests"},"Display recent requests"),(0,i.mdx)("p",null,"The following command displays the 15 most recent requests by rayID and the status of those requests:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:log-list \n")),(0,i.mdx)("p",null,"By default, the requests display in YAML."),(0,i.mdx)("p",null,"The rayID is a unique identifier that is associated with every request made through an edge mesh. After finding the relevant rayID, use the ",(0,i.mdx)("inlineCode",{parentName:"p"},"aio api-mesh:log-get")," command to retrieve the logs for that rayID."),(0,i.mdx)("p",null,"For more information see ",(0,i.mdx)("a",{parentName:"p",href:"./index.md#aio-api-meshlog-list"},(0,i.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:log-list")),"."),(0,i.mdx)("h2",{id:"display-a-single-log-by-rayid"},"Display a single log by rayID"),(0,i.mdx)("p",null,"After finding the desired rayID with the ",(0,i.mdx)("a",{parentName:"p",href:"#display-recent-requests"},(0,i.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:log-list"))," command, you can use the following command to retrieve the logs for a specific rayID:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:log-get 1a123456789abcd0\n")),(0,i.mdx)("p",null,"For more information see ",(0,i.mdx)("a",{parentName:"p",href:"./index.md#aio-api-meshlog-get"},(0,i.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:log-get")),"."),(0,i.mdx)("h2",{id:"export-bulk-logs"},"Export bulk logs"),(0,i.mdx)("p",null,"Use the following command to create a CSV file with logs for the selected mesh during the specified time range. The maximum time between the ",(0,i.mdx)("inlineCode",{parentName:"p"},"startTime")," and ",(0,i.mdx)("inlineCode",{parentName:"p"},"endTime")," is 30 minutes:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-bash"},"aio api-mesh:log-get-bulk --startTime 2024-08-27T21:31:39Z --endTime 2024-08-27T21:55:54Z --filename mesh_logs.csv\n")),(0,i.mdx)("p",null,"The time format is ",(0,i.mdx)("inlineCode",{parentName:"p"},"YYYY-MM-DDTHH:MM:SSZ"),". You must convert your local time to UTC."),(0,i.mdx)("p",null,"For more information see ",(0,i.mdx)("a",{parentName:"p",href:"./index.md#aio-api-meshlog-get-bulk"},(0,i.mdx)("inlineCode",{parentName:"a"},"aio api-mesh:log-get-bulk")),"."))}g.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-mesh-advanced-logging-md-bbd0178b6319ff81de63.js.map