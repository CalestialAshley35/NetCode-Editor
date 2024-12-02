        const htmlCode = document.getElementById("html-code");
        const cssCode = document.getElementById("css-code");
        const jsCode = document.getElementById("js-code");
        const output = document.getElementById("output");
        const downloadBtn = document.getElementById("download-btn");
        const downloadHtmlIcon = document.getElementById("download-html");
        const settingsBtn = document.getElementById("settings-btn");
        const networkBtn = document.getElementById("network-btn");
        const settingsModal = document.getElementById("settings-modal");
        const saveSettingsBtn = document.getElementById("save-settings");
        const htmlColorInput = document.getElementById("html-color");
        const cssColorInput = document.getElementById("css-color");
        const jsColorInput = document.getElementById("js-color");

        function updateOutput() {
            const html = htmlCode.value;
            const css = `<style>${cssCode.value}</style>`;
            const js = `<script>${jsCode.value}<\/script>`;
            
            output.contentDocument.body.innerHTML = html + css + js;
        }

        function downloadFile() {
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>My Custom Code</title>
                    <style>
                        ${cssCode.value}
                    </style>
                </head>
                <body>
                    ${htmlCode.value}
                    <script>
                        ${jsCode.value}
                    <\/script>
                </body>
                </html>
            `;
            
            const blob = new Blob([htmlContent], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "my_custom_code.html";
            link.click();
        }

        function downloadHtmlOnly() {
            const blob = new Blob([htmlCode.value], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "my_html_code.html";
            link.click();
        }

        function openSettings() {
            settingsModal.style.display = "flex";
        }

        function closeSettings() {
            settingsModal.style.display = "none";
        }

        function applySettings() {
            const htmlColor = htmlColorInput.value;
            const cssColor = cssColorInput.value;
            const jsColor = jsColorInput.value;

            htmlCode.style.color = htmlColor;
            cssCode.style.color = cssColor;
            jsCode.style.color = jsColor;

            closeSettings();
        }

        function openNetworking() {
            const newWindow = window.open('about:blank', '_blank');
            const html = htmlCode.value;
            const css = `<style>${cssCode.value}</style>`;
            const js = `<script>${jsCode.value}<\/script>`;
            newWindow.document.write(html + css + js);
            newWindow.document.close();
        }

        // Event Listeners
        htmlCode.addEventListener("input", updateOutput);
        cssCode.addEventListener("input", updateOutput);
        jsCode.addEventListener("input", updateOutput);

        downloadBtn.addEventListener("click", downloadFile);
        downloadHtmlIcon.addEventListener("click", downloadHtmlOnly);
        settingsBtn.addEventListener("click", openSettings);
        saveSettingsBtn.addEventListener("click", applySettings);
        networkBtn.addEventListener("click", openNetworking);

        // Close modal when clicking outside the modal content
        window.addEventListener("click", function(event) {
            if (event.target == settingsModal) {
                closeSettings();
            }
        });

        // Initial Output Update
        updateOutput(); 
