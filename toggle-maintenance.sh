#!/bin/bash

# syris. Maintenance Mode Toggle Script
# Usage: ./toggle-maintenance.sh [on|off|status]

set -e

SITE_DIR="/Users/studio-ai/syris-site"
INDEX_FILE="$SITE_DIR/index.html"
COMING_SOON_FILE="$SITE_DIR/coming-soon.html"
FULL_SITE_FILE="$SITE_DIR/index-full-site.html"
BACKUP_FILE="$SITE_DIR/index-backup.html"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function print_status() {
    echo -e "${BLUE}🔧 syris. Maintenance Control${NC}"
    echo "=================================="
}

function check_status() {
    if [ -f "$INDEX_FILE" ]; then
        # Check if current index.html contains "coming soon"
        if grep -q "coming soon" "$INDEX_FILE"; then
            echo -e "${YELLOW}Status: MAINTENANCE MODE${NC} - Showing coming soon page"
            return 0
        else
            echo -e "${GREEN}Status: LIVE MODE${NC} - Showing full website"
            return 1
        fi
    else
        echo -e "${RED}Error: index.html not found${NC}"
        return 2
    fi
}

function enable_maintenance() {
    print_status
    echo -e "${YELLOW}Enabling maintenance mode...${NC}"
    
    # Backup current index.html
    if [ -f "$INDEX_FILE" ]; then
        cp "$INDEX_FILE" "$BACKUP_FILE"
        echo "✅ Backed up current index.html"
    fi
    
    # Copy coming-soon.html to index.html
    if [ -f "$COMING_SOON_FILE" ]; then
        cp "$COMING_SOON_FILE" "$INDEX_FILE"
        echo "✅ Switched to coming soon page"
    else
        echo -e "${RED}Error: coming-soon.html not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Maintenance mode enabled${NC}"
    echo "Your site now shows the coming soon page"
}

function disable_maintenance() {
    print_status
    echo -e "${GREEN}Disabling maintenance mode...${NC}"
    
    # Copy full site to index.html
    if [ -f "$FULL_SITE_FILE" ]; then
        cp "$FULL_SITE_FILE" "$INDEX_FILE"
        echo "✅ Switched to full website"
    else
        echo -e "${RED}Error: index-full-site.html not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Maintenance mode disabled${NC}"
    echo "Your site now shows the full website"
}

function show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  on      Enable maintenance mode (show coming soon page)"
    echo "  off     Disable maintenance mode (show full website)"
    echo "  status  Show current status"
    echo "  help    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 on     # Enable maintenance mode"
    echo "  $0 off    # Disable maintenance mode"
    echo "  $0 status # Check current status"
}

# Main script logic
case "${1:-status}" in
    "on"|"enable"|"maintenance")
        enable_maintenance
        ;;
    "off"|"disable"|"live")
        disable_maintenance
        ;;
    "status"|"check")
        print_status
        check_status
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
