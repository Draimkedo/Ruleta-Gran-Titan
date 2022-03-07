using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Back_End.Models
{
    public partial class RuletaContext : DbContext
    {
        public RuletaContext()
        {
        }

        public RuletaContext(DbContextOptions<RuletaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ludopatium> Ludopatia { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS; Database=Ruleta; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ludopatium>(entity =>
            {
                entity.Property(e => e.CreadorDocumento)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreadorNombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroMaximo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroMinimo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroRuleta)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
