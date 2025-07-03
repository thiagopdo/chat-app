import { SendIcon as Send } from "lucide-react";
import { THEMES } from "../constants/index.js";
import { useThemeStore } from "../store/useThemeStore.js";

const PREVIEW_MESSAGES = [
 { id: 1, content: "Welcome to the settings page!", isSent: false },
 { id: 2, content: "Working on some new features", isSent: true },
];

function SettingsPage() {
 const { theme, setTheme } = useThemeStore();

 return (
  <div className="container px-4 pt-20 mx-auto max-w-5xl h-screen">
   <div className="space-y-6">
    <div className="flex flex-col gap-1">
     <h2 className="text-lg font-semibold">Theme</h2>
     <p className="text-sm text-base-content/70">
      Choose a theme for your chat
     </p>
    </div>

    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
     {THEMES.map((t) => (
      <button
       type="button"
       key={t}
       className={`flex flex-col group items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
       onClick={() => setTheme(t)}
      >
       <div
        className="overflow-hidden relative w-full h-8 rounded-md"
        data-theme={t}
       >
        <div className="grid absolute inset-0 grid-cols-4 gap-px p-1">
         <div className="rounded bg-primary" />
         <div className="rounded bg-secondary" />
         <div className="rounded bg-accent" />
         <div className="rounded bg-neutral" />
        </div>
       </div>
       <span className="text-[11px] font-medium truncate w-full text-center">
        {t.charAt(0).toUpperCase() + t.slice(1)}
       </span>
      </button>
     ))}
    </div>
    <h3 className="mb-3 text-lg font-semibold">Preview</h3>
    <div className="overflow-hidden rounded-xl border shadow-lg border-base-300 bg-base-100">
     <div className="p-4 bg-base-200">
      <div className="mx-auto max-w-lg">
       {/* Mock Chat UI */}
       <div className="overflow-hidden rounded-xl shadow-sm bg-base-100">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-base-300 bg-base-100">
         <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center w-8 h-8 font-medium rounded-full bg-primary text-primary-content">
           J
          </div>
          <div>
           <h3 className="text-sm font-medium">John Doe</h3>
           <p className="text-xs text-base-content/70">Online</p>
          </div>
         </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
         {PREVIEW_MESSAGES.map((message) => (
          <div
           key={message.id}
           className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
          >
           <div
            className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
           >
            <p className="text-sm">{message.content}</p>
            <p
             className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
            >
             12:00 PM
            </p>
           </div>
          </div>
         ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-base-300 bg-base-100">
         <div className="flex gap-2">
          <input
           type="text"
           className="flex-1 h-10 text-sm input input-bordered"
           placeholder="Type a message..."
           value="This is a preview"
           readOnly
          />
          <button type="button" className="h-10 min-h-0 btn btn-primary">
           <Send size={18} />
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default SettingsPage;
