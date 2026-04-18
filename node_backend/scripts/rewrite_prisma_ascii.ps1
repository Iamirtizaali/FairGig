$schemas = @(
    @{ path = 'D:\FairGig\node_backend\apps\auth-service\prisma\schema.prisma'; schema = 'auth' },
    @{ path = 'D:\FairGig\node_backend\apps\earnings-service\prisma\schema.prisma'; schema = 'earnings' },
    @{ path = 'D:\FairGig\node_backend\apps\certificate-service\prisma\schema.prisma'; schema = 'certificate' },
    @{ path = 'D:\FairGig\node_backend\apps\grievance-service\prisma\schema.prisma'; schema = 'grievance' }
)

foreach ($item in $schemas) {
    $content = @"
generator client {
  provider = ""prisma-client-js""
  previewFeatures = [""multiSchema""]
}

datasource db {
  provider = ""postgresql""
  url      = env(""DATABASE_URL"")
  schemas  = [""$($item.schema)"", ""audit""]
}
"@

    [System.IO.File]::WriteAllText($item.path, $content, [System.Text.Encoding]::ASCII)
}
