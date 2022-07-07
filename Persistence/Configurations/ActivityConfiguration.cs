using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain;

namespace Persistence.Configurations
{
    public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.ToTable("Activity").HasKey(p => p.Id).HasName("Id");
            builder.Property(p => p.Title).HasColumnName("Title").IsRequired(true);
            builder.Property(p => p.Category).HasColumnName("Category").IsRequired(false);
            builder.Property(p => p.City).HasColumnName("City").IsRequired(false);
            builder.Property(p => p.Date).HasColumnName("Date").IsRequired(true);
            builder.Property(p => p.Description).HasColumnName("Description").IsRequired(false);
            builder.Property(p => p.Venue).HasColumnName("Venue").IsRequired(false);
        }
    }
}
