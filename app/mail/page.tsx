import MailPageClient from '@/components/mail/mail-page-client'

export default async function MailPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const folderParam = resolvedSearchParams.folder
  const initialFolder = Array.isArray(folderParam) ? folderParam[0] : folderParam

  return <MailPageClient initialFolder={initialFolder || 'inbox'} />
}
