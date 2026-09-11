export function getStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    case "recommended":
        return "bg-green-300 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    case "inactive":
    case "not recommended":
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    case "review":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "draft":
    case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "closed":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    default:
        return "bg-primary/10 text-primary";
  }
}